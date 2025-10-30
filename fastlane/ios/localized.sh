#!/bin/bash

# 获取脚本所在的绝对目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 定义输入文件路径和输出目录（都使用脚本所在目录的绝对路径）
INPUT_FILE="$SCRIPT_DIR/localized.yaml"
OUTPUT_DIR="$SCRIPT_DIR/metadata"

# 调试信息（可选，生产环境可以注释掉）
echo "==============================================="
echo "脚本执行信息:"
echo "脚本所在目录: $SCRIPT_DIR"
echo "输入文件路径: $INPUT_FILE"
echo "输出目录路径: $OUTPUT_DIR"
echo "当前工作目录: $(pwd)"
echo "==============================================="

# 检查输入文件是否存在
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ 错误: 输入文件不存在: $INPUT_FILE"
    echo "请确保在脚本所在目录中存在 localized.yaml 文件"
    exit 1
fi

# 检查必要的命令是否存在
command -v yq >/dev/null 2>&1 || { echo "❌ 错误: 需要安装 yq 命令" >&2; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "❌ 错误: 需要安装 jq 命令" >&2; exit 1; }

# 创建输出目录（如果不存在）
mkdir -p "$OUTPUT_DIR"

# 需要删除的语言目录列表
LANGUAGES=("ar-SA" "ca" "cs" "da" "de-DE" "el" "en-AU" "en-CA" "en-GB" "en-US" "es-ES" "es-MX" "fi" "fr-CA" "fr-FR" "he" "hi" "hr" "hu" "id" "it" "ja" "ko" "ms" "nl-NL" "no" "pl" "pt-BR" "pt-PT" "ro" "ru" "sk" "sv" "th" "tr" "uk" "vi" "zh-Hans" "zh-Hant")

echo "🗑️  清理旧的语言目录..."
# 删除指定语言目录
for lang in "${LANGUAGES[@]}"; do
  if [ -d "$OUTPUT_DIR/$lang" ]; then
    rm -rf "$OUTPUT_DIR/$lang"
    echo "   删除: $OUTPUT_DIR/$lang"
  fi
done

echo "📝 开始处理 YAML 文件..."

# 读取 YAML 文件并直接生成目录结构
yq -o=json "$INPUT_FILE" | jq -c 'to_entries[]' | while IFS= read -r line; do
  lang_code=$(echo $line | jq -r '.key')
  echo "   处理语言: $lang_code"

  # 创建语言目录
  mkdir -p "$OUTPUT_DIR/$lang_code"

  # 提取并创建文本文件
  echo $line | jq -r '.value | to_entries[] | "\(.key)"' | while IFS= read -r field; do
    key=$(echo $field | xargs)  # 去除空格
    value=$(echo $line | jq -r ".value[\"$key\"]")  # 保留原始值，不做转换
    echo "$value" > "$OUTPUT_DIR/$lang_code/$key.txt"
  done
done

echo "✅ 转换完成！"
echo "📁 输出目录: $OUTPUT_DIR"
echo "📋 生成的语言目录:"

# 列出生成的目录
if [ -d "$OUTPUT_DIR" ]; then
    ls -la "$OUTPUT_DIR" | grep "^d" | awk '{print "   - " $9}' | grep -v "^\.\.\?$"
fi

echo "==============================================="
<!-- 后端 -->
// @pay*blu.route("/getPayLink", methods=["POST"])
// def get_pay_link():
// paylod = request.json
// logging.info("获取支付连接")
// mchid = '1593541201' # PAYJS 商户号
// key = 'YiQtLvcisq1Fjzo5' # 通信密钥
// # 构造订单参数
// money = paylod.get("money")
// pay_type = paylod.get("payType", None)
// time_str = str(int(time.time()))
// # 1024 小神支付使用的就是这种方式，然后将 url 生成二维码，即可支付
// # 默认微信支付，如果是支付宝需要添加："type":"alipay"
// order = {
// 'mchid': mchid,
// 'body': '我是一个测试订单标题', # 订单标题
// 'total_fee': money, # 金额,单位:分
// 'out_trade_no': 'payjs_jspay_demo*' + time_str, # 订单号
// "auto": 1,
// "hide": 1,
// "type": pay_type # 微信支付无需填写
// }
// # 添加数据签名
// order['sign'] = pay_sign(order, key)
// # 浏览器跳转到收银台
// url = 'https://payjs.cn/api/cashier?' + str(urlencode(order))
// # web.open(url,new=0,autoraise=True)
// print(url)
// return jsonify(code=200, message="success", data={"link": url})


<!-- 前端 -->
<!-- <template>
  <div class="test-box">
    <div class="form-inline">
      <span class="label">请输入充值金额:</span>
      <el-input
        class="input-money"
        v-model="payMoney"
        placeholder="请输入充值金额"
      >
        <template slot="append">元</template>
      </el-input>
    </div>
    <div class="pay-btn">
      <el-button
        type="primary"
        @click="zfbPay"
      >点击支付宝支付</el-button>
      <el-button
        type="success"
        @click="wxPay"
      >点击微信支付</el-button>
    </div>
    <div class="pay-code">
      <QCode
        :content="payLink"
        ref="qrcode"
      ></QCode>
    </div>
  </div>
</template>

<script>
import QCode from '@/components/Qrcode/index.vue'
import PayApi from '@/api/pay'

export default {
  name: 'PayTest',
  components: {
    QCode
  },
  data() {
    return {
      payMoney: '',
      payLink: ''
    }
  },
  methods: {
    async zfbPay() {
      console.log('支付宝支付')
      const res = await PayApi.getPayLink({
        money: parseInt(this.payMoney * 100),
        payType: 'alipay'
      })
      console.log('res---', res)
      if (res.code === 200) {
        this.payLink = res.data.link
        this.$refs.qrcode.showQRCode(this.payLink)
      } else {
        this.$message.error('获取链接失败:' + res.message)
      }
    },
    async wxPay() {
      console.log('微信支付')
      const res = await PayApi.getPayLink({
        money: parseInt(this.payMoney * 100),
        payType: ''
      })
      if (res.code === 200) {
        this.payLink = res.data.link
        this.$refs.qrcode.showQRCode(this.payLink)
      } else {
        this.$message.error('获取链接失败:' + res.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-inline {
  display: flex;
  align-items: center;
  .label {
    width: 130px;
  }
  .input-money {
    width: 300px;
  }
}

.pay-btn {
  margin: 15px;
}
</style> -->

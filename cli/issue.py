import requests
import os
import base64
import json


def get_issue(keyword):
    print("获取issue内容")
    url = f"https://api.github.com/search/issues?q={keyword}+state:open+in:title+repo:Sjj1024/PakePlus"
    headers = {
        'Authorization': f'Bearer {os.environ.get("TOKEN")}'
    }
    response = requests.request("GET", url, headers=headers).json()
    print("response", response)
    issue_list = response.get("items")
    for iss in issue_list:
        # 存储用户成功后，再关闭issue
        issNum = iss.get("number")
        if keyword in iss.get("title"):
            # 关闭issue并且贴标签
            close_issue(issNum, "closed", ["success"])


def close_issue(num, state, labels):
    print("关闭issue")
    url = f"https://api.github.com/repos/Sjj1024/PakePlus/issues/{num}"
    payload = json.dumps({
        "state": state,
        "labels": labels
    })
    headers = {
        'Authorization': f'Bearer {os.environ.get("TOKEN")}',
        'Content-Type': 'text/plain'
    }
    response = requests.request("PATCH", url, headers=headers, data=payload)
    print(response.text)


def save_doc_user(userName, content):
    print("保存用户")
    url = f"https://api.github.com/repos/Sjj1024/DataHub/contents/DocData/users/{userName}.txt"
    base64_content = base64.b64encode(content.encode("utf-8"))
    payload = json.dumps({
        "message": "Register Dochub User",
        "content": base64_content.decode("utf-8")
    })
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': f'Bearer {os.environ.get("TOKEN")}',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'text/plain'
    }
    response = requests.request("PUT", url, headers=headers, data=payload).json()
    print(response)
    if response.get("content"):
        return True
    else:
        return False


def save_file_user(userName, content):
    print("保存用户")
    url = f"https://api.github.com/repos/Sjj1024/DataHub/contents/FileData/users/{userName}.txt"
    base64_content = base64.b64encode(content.encode("utf-8"))
    payload = json.dumps({
        "message": "Register Filehub User",
        "content": base64_content.decode("utf-8")
    })
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': f'Bearer {os.environ.get("TOKEN")}',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'text/plain'
    }
    response = requests.request("PUT", url, headers=headers, data=payload).json()
    print(response)
    if response.get("content"):
        return True
    else:
        return False


def run():
    print("开始执行")
    keywords = ["success"]
    for k in keywords:
        get_issue(k)


if __name__ == '__main__':
    run()
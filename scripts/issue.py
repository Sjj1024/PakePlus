import requests
import os
import base64
import json


def get_issue(keyword):
    url = f"https://api.github.com/search/issues?q={keyword}+state:open+in:title+repo:Sjj1024/PakePlus"
    headers = {
        'Authorization': f'Bearer {os.environ.get("TOKEN")}'
    }
    response = requests.request("GET", url, headers=headers).json()
    print("response", response)
    issue_list = response.get("items")
    for iss in issue_list:
        issNum = iss.get("number")
        title = iss.get("title")
        if keyword in title and title == "build success":
            close_issue(issNum, "closed", ["success"])


def close_issue(num, state, labels):
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


def run():
    keywords = ["success"]
    for k in keywords:
        get_issue(k)


if __name__ == '__main__':
    run()
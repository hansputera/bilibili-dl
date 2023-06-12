import os
import requests

file = open(os.path.join(
    os.path.dirname(__file__),
    "bilibili-creds",
    "cookies.txt"
), "r")

cookie = file.read()
file.close()

user_info_url = 'https://api.bilibili.tv/intl/gateway/web/v2/user'

## 1. get user info
response = requests.get(user_info_url, headers={
    'Cookie': cookie
})

print(response.json())
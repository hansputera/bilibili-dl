import requests
import qrcode
import os

from time import sleep, mktime
from json import dumps
from datetime import datetime

# Login method via QR
creds_path = os.path.join(
    os.path.dirname(__file__),
    "bilibili-creds"
)

if os.path.exists(creds_path) == False:
    os.mkdir(creds_path)

def generate_queries(**kwargs):
    ticketid = kwargs.get("ticket_id", None)
    payload = dict({
        "s_locale": "en_US",
        "platform": "tv"
    })

    if ticketid is not None:
        payload['ticket'] = ticketid
   
    return payload

def write_to_file(file: str, contents: str):
    with open(os.path.join(creds_path, file), 'w') as f:
        f.write(contents)
        f.close()

passport_url = 'https://passport.bilibili.tv/x/intl/passport-login/qrcode/auth/url'
passport_pool_url = 'https://passport.bilibili.tv/x/intl/passport-login/qrcode/auth/fetch'

## 0. Fetch QR code

def fetch_qr():
    response = requests.get(passport_url, params=generate_queries(), timeout=3000)

    qr_url = response.json()['data']['qr_url']
    print('[d] QR Fetch URL: ' + qr_url)
    qr_image = qrcode.make(qr_url)
    qr_image.save('qr.png')

    return qr_url

## 1. Short pool

ticket_id = fetch_qr().split('?ticket=')[1]
print('[!] Running short pool')
while True:
    response = requests.get(passport_pool_url, params=generate_queries(ticket_id=ticket_id), timeout=5000)
    data = response.json()
    code = data['code']

    print('[i] Receive code: ' + str(code))
    if code == 10018100:
        print('[!] Previous QR is expired, renewing...')
        ticket_id = fetch_qr().split('?ticket=')[1]
        print('[!] QR renewed')
    elif code == 10018102 and 'data' not in data:
        print('[!] QR scanned, but I couldn\'t receive any user data')
    elif code == 0 and 'data' in data:
        ## 2. Save credentials (like cookies, tokens [access token, and refresh token])
        token_info = data['data']['token_info']
        cookies = data['data']['cookie_info']['cookies']

        print('[!] QR scanned, and user data is available.')
        print('[i] Logged in as user: ' + str(token_info['mid']))
        print('[i] Saving credentials...')

        cookies_text = ''
        for cookie in cookies:
            cookies_text += f"{cookie['name']}={cookie['value']}; "
    
        creds_payload = dumps({
            "accessToken": token_info['access_token'],
            "id": token_info['mid'],
            "refreshToken": token_info['refresh_token'],
            "expires_at": str(mktime(datetime.now().timetuple()) + token_info['expires_in'])
        })

        write_to_file("tokens.json", creds_payload)
        write_to_file("cookies.txt", cookies_text)

        break
    sleep(3)

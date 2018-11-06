import json
import os

streamLogin = [
    {
        'username': 'imthebest.fcktherest@gmail.com',
        'password': '2LKDGgDTyz'
    },
    {
        'username': 'imthe.bestfcktherest@gmail.com',
        'password': 'MJDXEhnNrq'
    }
]

canais = {
    'sporttv1': {
        'id': 7049,
        'nome': 'SPORT TV 1'
    },
    'elevensports1': {
        'id': 29089,
        'nome': 'ELEVEN SPORTS 1'
    }
}

with open('canais.json', 'w') as outfile:
    json.dump(canais, outfile, indent=4)

pm2_json = {
    'apps': []
}

i = 0
for canal in canais:
    args = '--canal {} --username {} --password {}'.format(canal, streamLogin[i]['username'], streamLogin[i]['password'])
    pm2_json['apps'].append({
        'name': canal,
        'script': '../web/streams/stream.js',
        'args': args
    })
    i += 1

with open('stream.json', 'w') as outfile:
    json.dump(pm2_json, outfile, indent=4)

os.system('pm2 start stream.json')
os.system('pm2 update')
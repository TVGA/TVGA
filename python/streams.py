import json
import os

with open('logins.json', 'r') as fp:
    logins = json.load(fp)

canais = {
    'sporttv1': {
        'id': 160,
        'nome': 'SPORT TV 1'
    },
    'elevensports1': {
        'id': 29089,
        'nome': 'ELEVEN SPORTS 1'
    },
    'tvcine1': {
        'id': 3987,
        'nome': 'TVCINE 1'
    },
    'tvcine2': {
        'id': 3988,
        'nome': 'TVCINE 2'
    },
    'tvcine3': {
        'id': 3989,
        'nome': 'TVCINE 3'
    },
    'tvcine4': {
        'id': 3990,
        'nome': 'TVCINE 4'
    },
    'benficatv1': {
        'id': 3944,
        'nome': 'BENFICA TV'
    }
}

with open('canais.json', 'w') as outfile:
    json.dump(canais, outfile, indent=4)

pm2_json = {
    'apps': []
}

i = 0
for canal in canais:
    try:
        args = '--canal {} --username {} --password {}'.format(canal, logins[i]['username'], logins[i]['password'])
        pm2_json['apps'].append({
            'name': canal,
            'script': '../web/streams/stream.js',
            'args': args
        })
        i += 1
    except:
        break

with open('streams.json', 'w') as outfile:
    json.dump(pm2_json, outfile, indent=4)

os.system('rm ../web/public/stream/*')
os.system('pm2 start streams.json')
os.system('pm2 update')
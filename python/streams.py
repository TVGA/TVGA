import json
import os

with open('logins.json', 'r') as fp:
    logins = json.load(fp)

canais = {
    'sporttv1': {
        'id': 3992,
        'nome': 'SPORT TV 1'
    },
    'sporttv2': {
        'id': 3993,
        'nome': 'SPORT TV 2'
    },
    'sporttv3': {
        'id': 16736,
        'nome': 'SPORT TV 3'
    },
    'sporttv4': {
        'id': 2495,
        'nome': 'SPORT TV 4'
    },
    'sporttv5': {
        'id': 2496,
        'nome': 'SPORT TV 5'
    },
    'elevensports1': {
        'id': 29125,
        'nome': 'ELEVEN SPORTS 1'
    },
    'elevensports2': {
        'id': 29088,
        'nome': 'ELEVEN SPORTS 2'
    },
    'elevensports3': {
        'id': 29087,
        'nome': 'ELEVEN SPORTS 3'
    },
    'elevensports4': {
        'id': 29086,
        'nome': 'ELEVEN SPORTS 4'
    },
    'elevensports5': {
        'id': 29085,
        'nome': 'ELEVEN SPORTS 5'
    },
    'elevensports6': {
        'id': 29084,
        'nome': 'ELEVEN SPORTS 6'
    },
    'benficatv': {
        'id': 3944,
        'nome': 'BENFICA TV'
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
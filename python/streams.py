import json
import os

with open('/home/tvga/tvga/python/logins.json', 'r') as fp:
    logins = json.load(fp)

canais = {
    'sporttv': {
        'sporttv1': {
            'id': 7049,
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
        }
    },
    'elevensports': {
        'elevensports1': {
            'id': 29089,
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
        }
    },
    'benficatv': {
        'benficatv': {
            'id': 7039,
            'nome': 'BENFICA TV'
        }
    },
    'tvcine': {
        'tvcine1': {
            'id': 7038,
            'nome': 'TVCINE 1'
        },
        'tvcine2': {
            'id': 3988,
            'nome': 'TVCINE 2'
        },
        'tvcine3': {
            'id': 7036,
            'nome': 'TVCINE 3'
        },
        'tvcine4': {
            'id': 3990,
            'nome': 'TVCINE 4'
        }
    },
    'fox': {
        'fox': {
            'id': 7030,
            'nome': 'FOX'
        },
        'foxlife': {
            'id': 7029,
            'nome': 'FOX LIFE'
        },
        'foxcomedy': {
            'id': 7027,
            'nome': 'FOX COMEDY'
        },
        'foxcrime': {
            'id': 7028,
            'nome': 'FOX CRIME'
        },
        'foxmovies': {
            'id': 7726,
            'nome': 'FOX MOVIES'
        }
    }
}

with open('canais.json', 'w') as outfile:
    json.dump(canais, outfile, indent=4)

pm2_json = {
    'apps': []
}

i = 0
for grupo in canais:
    for canal in canais[grupo]:
        try:
            args = '--grupo {} --canal {} --username {} --password {}'.format(grupo, canal, logins[i]['username'], logins[i]['password'])
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

os.system('rm /home/tvga/tvga/web/public/stream-*/*')
os.system('pm2 start streams.json')
os.system('pm2 update')
import json
import os

try:
    with open('streamPath.json', 'r') as fp:
        lastHash = json.load(fp)
except:
    lastHash = 'stream'

with open('logins.json', 'r') as fp:
    logins = json.load(fp)

canais = {
    'sporttv': {
        'sporttv1': {
            'id': [7049, 16742, 16741, 16740, 3992, 160],
            'nome': 'SPORT TV 1'
        },
        'sporttv2': {
            'id': [7043, 16739, 16738, 159, 3993],
            'nome': 'SPORT TV 2'
        },
        'sporttv3': {
            'id': [7042, 16737, 16736, 158, 3994],
            'nome': 'SPORT TV 3'
        },
        'sporttv4': {
            'id': [7041, 16735, 16734, 2495, 3995],
            'nome': 'SPORT TV 4'
        },
        'sporttv5': {
            'id': [7040, 16733, 16732, 2496, 3997],
            'nome': 'SPORT TV 5'
        }
    },
    'elevensports': {
        'elevensports1': {
            'id': [29089, 29125],
            'nome': 'ELEVEN SPORTS 1'
        },
        'elevensports2': {
            'id': [29088, 29124],
            'nome': 'ELEVEN SPORTS 2'
        },
        'elevensports3': {
            'id': [29087, 29123],
            'nome': 'ELEVEN SPORTS 3'
        },
        'elevensports4': {
            'id': [29086, 29122],
            'nome': 'ELEVEN SPORTS 4'
        },
        'elevensports5': {
            'id': [29085, 29121],
            'nome': 'ELEVEN SPORTS 5'
        },
        'elevensports6': {
            'id': [29084, 29120],
            'nome': 'ELEVEN SPORTS 6'
        }
    },
    'benficatv': {
        'benficatv': {
            'id': [7039, 16731, 3944],
            'nome': 'BENFICA TV'
        }
    },
    'tvcine': {
        'tvcine1': {
            'id': [7038, 3987],
            'nome': 'TVCINE 1'
        },
        'tvcine2': {
            'id': [7037, 3988],
            'nome': 'TVCINE 2'
        },
        'tvcine3': {
            'id': [7036, 3989],
            'nome': 'TVCINE 3'
        },
        'tvcine4': {
            'id': [7035, 3990],
            'nome': 'TVCINE 4'
        }
    },
    'fox': {
        'fox': {
            'id': [7030, 3938],
            'nome': 'FOX'
        },
        'foxlife': {
            'id': [7029, 3939],
            'nome': 'FOX LIFE'
        },
        'foxcomedy': {
            'id': [7027, 3965],
            'nome': 'FOX COMEDY'
        },
        'foxcrime': {
            'id': [7028, 3940],
            'nome': 'FOX CRIME'
        },
        'foxmovies': {
            'id': [7726, 3996],
            'nome': 'FOX MOVIES'
        }
    }
}

with open('canais.json', 'w') as outfile:
    json.dump(canais, outfile, indent=4)

pm2_json = {
    'apps': []
}

os.system('rm ../web/public/{}/*'.format(lastHash))

with open('../web/public/lista/tvga.m3u', 'w') as f:
    f.write('#EXTM3U')
    i = 0
    for grupo in canais:
        for canal in canais[grupo]:
            f.write('\n#EXTINF:-1 tvg-ID="" tvg-name="{}" tvg-logo="https://tvga.ml/images/canais/{}.png",{}'.format(canais[grupo][canal]['nome'], canal, canais[grupo][canal]['nome']))
            f.write('\nhttps://tvga.ml/{}/{}.m3u8'.format(lastHash, canal))
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

os.system('pm2 start streams.json')
os.system('pm2 update')
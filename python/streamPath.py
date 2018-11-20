import random
import json
import os

hash = random.getrandbits(128)

xHash = [hash]

with open('hash.json', 'w') as outfile:
    json.dump(xHash, outfile, indent=4)

os.system('mv ../web/public/stream-*/ ../web/public/stream-{}'.format(hash))
os.system('pm2 update')
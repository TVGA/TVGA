import random
import json
import os

hash = random.getrandbits(32)

xHash = [hash]

with open('hash.json', 'w') as outfile:
    json.dump(xHash, outfile, indent=4)

print(hash)

os.system('mv ../web/public/stream-*/ ../web/public/stream-{}'.format(hash))
os.system('pm2 update')
import random
import json
import os

hash = random.getrandbits(32)

xHash = [hash]

with open('hash.json', 'w') as outfile:
    json.dump(xHash, outfile, indent=4)

os.system('mv /home/tvga/tvga/web/public/stream-*/ /home/tvga/tvga/public/stream-{}'.format(hash))
os.system('pm2 update')
import random
import json
import os

hash = random.getrandbits(32)

xHash = [hash]

with open('/home/tvga/tvga/python/hash.json', 'w') as outfile:
    json.dump(xHash, outfile, indent=4)

print(hash)

os.system('mv /home/tvga/tvga/web/public/stream-*/ /home/tvga/tvga/web/public/stream-{}'.format(hash))
os.system('sudo pm2 update')
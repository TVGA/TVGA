import uuid
import json
import os

try:
    with open('streamPath.json', 'r') as fp:
        lastHash = json.load(fp)
except:
    lastHash = 'stream'

uid = uuid.uuid4()
hash = uid.hex

print(hash)

with open('streamPath.json', 'w') as outfile:
    json.dump(hash, outfile, indent=4)

os.system('mv ../web/public/{} ../web/public/{}'.format(lastHash, hash))
os.system('python3 streams.py')
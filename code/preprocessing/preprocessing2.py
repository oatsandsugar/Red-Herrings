import json
import sys

for line in open(sys.argv[1]):
    data = json.loads(line)
    try:
        print data['name']
    except:
        continue
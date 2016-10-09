import sys
import json
from difflib import SequenceMatcher


queries = []
with open("../company.txt") as lines:
    for line in lines:
        values = line.strip().split("\t")
        queries.append(values)

infile = sys.argv[1]
idx = 0
with open(infile) as lines:
    for line in lines:
        obj = json.loads(line)
        if int(obj['total']) > 0:
            #print obj['businesses'][0].keys()
            max_ratio = 0
            max_name = ""
            max_idx = 0
            if len(obj['businesses']) == 0:
                continue
            i = 0
            for b in obj['businesses']:
                name = b['name']
                ratio = SequenceMatcher(None, queries[idx][0], name).ratio()
                if ratio > max_ratio:
                    max_ratio = ratio
                    max_name = name
                    max_idx = i
                i += 1
            if max_ratio > 0.7:
                #print str(max_ratio) + "---" + max_name + "---" + queries[idx][0]
                print queries[idx][0] + "," + obj['businesses'][max_idx]['id']
        idx += 1

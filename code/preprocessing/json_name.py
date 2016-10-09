import json
import csv
import sys


data = []
reader = csv.reader(open(sys.argv[1]))
reader.next()
for row in reader:
    # row = reader.next()
    data.append(row[int(sys.argv[2])])

print json.dumps(data)
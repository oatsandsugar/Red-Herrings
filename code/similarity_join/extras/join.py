from multiprocessing import Pool, cpu_count
import sys
import csv
from utils import Entity
import pickle
import re

# file1 = sys.argv[1]
# fields1 = map(int, sys.argv[2].split(','))
# fieldsforanalysis1 = map(int, sys.argv[3].split(','))
# file2 = sys.argv[4]
# fields2 = map(int, sys.argv[5].split(','))
# fieldsforanalysis6 = map(int, sys.argv[6].split(','))

file1 = sys.argv[1]
fields1 = map(int, sys.argv[2].split(','))
file2 = sys.argv[3]
fields2 = map(int, sys.argv[4].split(','))
outputfilename = sys.argv[5]

pattern=re.compile("[^\w']")
def gen_signature(string):
    string = string.lower()
    string = pattern.sub(' ', string)
    data = filter(None, string.split(' '))
    return ''.join([x for x in data if len(x) > 1])

def entity_similarity(objs):
    e1 = objs[0][1]
    e2 = objs[1][1]
    print objs
    return []

def remove_commas(row):
  new_row = []
  for elem in row:
    new_row.append(elem.replace(",", ";"))
  return new_row

def read_data(fname, fields):
    reader = csv.reader(open(fname))
    data = []
    for row in reader:
        f0 = None
        if fields[0] < len(row):
            f0 = row[fields[0]]
        f1 = None
        if fields[1] < len(row):
            f1 = row[fields[1]]
        f2 = None
        if fields[2] < len(row):
            f2 = row[fields[2]]
#        entity = Entity(f0, f1, f2)
#        data.append((row, entity))
        data.append(row)
    return data

data1 = read_data(file1, fields1)
data2 = read_data(file2, fields2)

#fields0 is the name of the business
businesses_in_data_1 = {}

for elem in data1:
   businesses_in_data_1[gen_signature(elem[fields1[0]])] = [remove_commas(elem)]

businesses_in_both = {}
for elem in data2:
  key = gen_signature(elem[fields2[0]])
  if businesses_in_data_1.has_key(key):
    businesses_in_both[key] = businesses_in_data_1[key]
    businesses_in_both[key].append(remove_commas(elem))
 
f = open(outputfilename, 'w')
for key in businesses_in_both.keys():
  rows = businesses_in_both[key]
  for tmp in rows[1:]:
    tmp_str = key + "," + ",".join(rows[0]) + "," + ",".join(tmp) + '\n'
    f.write(tmp_str)
f.close()

# businesses_in_both_with_same_address = {}
# for key in businesses_in_both.keys():
#   rows = businesses_in_both[key]
#   print len(rows)
#   address1 = rows[0][fields1[1]]
#   address2 = rows[1][fields2[1]]
#   if gen_signature(address1) == gen_signature(address2):
#     print key, rows  

# for x in data1:
#     for y in data2:
#         inputs.append((x, y))



# entity_similarity(inputs)
# p = Pool(cpu_count())
# results = p.map(entity_similarity, inputs)
# pickle.dump(results, open('results.bin', 'w'))
# pickle.dump(inputs, open('inputs.bin', 'w'))

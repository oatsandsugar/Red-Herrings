from multiprocessing import Pool, cpu_count
import sys
import csv
from utils import Entity
import pickle

file1 = sys.argv[1]
fields1 = map(int, sys.argv[2].split(','))
file2 = sys.argv[3]
fields2 = map(int, sys.argv[4].split(','))

def entity_similarity(objs):
    e1 = objs[0][1]
    e2 = objs[1][1]
    return e1.similarity(e2)


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
        entity = Entity(f0, f1, f2)
        data.append((row, entity))
    return data

inputs = []
data1 = read_data(file1, fields1)
data2 = read_data(file2, fields2)

for x in data1:
    for y in data2:
        inputs.append((x, y))

p = Pool(cpu_count())
results = p.map(entity_similarity, inputs)
pickle.dump(results, open('results.bin', 'w'))
pickle.dump(inputs, open('inputs.bin', 'w'))
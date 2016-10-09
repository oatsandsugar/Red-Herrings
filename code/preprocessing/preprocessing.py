import csv
import sys

reader = csv.reader(open(sys.argv[1]))
for row in reader:
    print row[int(sys.argv[2])]
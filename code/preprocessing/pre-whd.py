import csv
import sys

reader = csv.reader(open(sys.argv[1]))
reader.next()

writer = csv.writer(open(sys.argv[1] + '.processed.csv', 'w'))

for row in reader:
    row.append(' '.join(row[4:9]))
    writer.writerow(row)

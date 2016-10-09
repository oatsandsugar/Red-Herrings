import csv
import sys

reader = csv.reader(open(sys.argv[1]))
writer = csv.writer(open(sys.argv[1] + '.fixed.csv', 'w'))

xlen = 0
for row in reader:
    # x = max([len(i) for i in row])
    # print x
    # print row[0]
    if ';' in row[0]:
        try:
            int(row[0].split(';')[0])
            continue
        except:
            pass
    if xlen == 0: xlen = len(row)
    if len(row) < xlen:
        continue
    writer.writerow(row)
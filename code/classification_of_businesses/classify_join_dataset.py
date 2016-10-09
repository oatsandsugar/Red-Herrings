'''
this script gets a dataset with features and labels for classes, maps them onto numeric values and runs a classifier (SVM with RBF kernel) to see how good these features potentially are to detect shady businesses. the current version has hardcoded most relevant values for each feature. in the future this will be flexible
'''

columns_main_values = {0: ['Drug Store Retail - 810', 'Misc Non-Food Retail - 817', 'Home Improvement Contractor - 100', 'Tax Preparers - 891', 'Electronic Store - 001', 'Garage - 049', 'Secondhand Dealer Auto - 005', 'Tow Truck Company - 124', 'Furniture Sales - 242'], 1: ['Damaged Goods - D01', 'Non-Delivery of Goods - N01', 'Advertising/Misleading - A02', 'Surcharge/Overcharge - S02', 'Exchange Goods/Contract Cancelled - E01', 'Misrepresentation - M01', 'Breach of Contract - B03'], 2: ['Cash Amount - AMT', 'Resolved and Consumer Satisfied - SPF', 'Complaint Invalid - CIN', 'Advised to Sue - ATS', 'No Business Response - NVR'], 3: ['No', 'NA', 'Yes'], 4: ['10001', '10005', '10459', '10457'], 5: ['Fail', 'Out of Business', 'Pass', 'Violation Issued', 'No Violation Issued']}

from sklearn import svm
import sys
import random

file=sys.argv[1]

f = open(file, 'r')
lines = f.readlines()[1:] #first line is header
f.close()

new_lines = []
for l in lines:
  fields = l.strip().split(',')
  for index, f in enumerate(fields):
    if index <= 5:
      values = columns_main_values[index]
      break_check = False
      for ind, v in enumerate(values):
        if f == v:
          fields[index] = ind + 1
          break_check = True
          break
      if not break_check:
        fields[index] = 0
  new_lines.append(fields)

#shuffle new lines
random.shuffle(new_lines)

x = [i[0:6] for i in new_lines]
y = [int(i[6]) for i in new_lines]

last_train_value = int(len(x) * 0.7)
x_train = x[0:last_train_value]
y_train = y[0:last_train_value]
x_test = x[last_train_value + 1:]
y_test = y[last_train_value + 1:]

clf = svm.SVC()
clf.fit(x_train, y_train)
print 'accuracy', clf.score(x_test, y_test)


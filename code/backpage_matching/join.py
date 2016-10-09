import sys
import csv
import json

def format_phone(s):
    phone = ""
    count = 0
    for c in s:
        if c.isdigit():
            count += 1
            phone += c
            if (count == 3)|(count == 6):
                phone += "-"
    if len(phone) == 13:
        if phone[0] == '1':
            phone = phone[1:]
            phone = phone.replace("-", "")
            phone = phone[:3] + "-" + phone[3:6] + "-" + phone[6:]
    return phone

def join_phone():
    ads_phones = set([])
    adsfile = sys.argv[1]
    f = open(adsfile, "rb")
    rows = csv.reader(f)
    for row in rows:
        phone = format_phone(row[-3])
        if len(phone) < 10:
            continue
        ads_phones.add(phone)
    print "Done"
    bp = sys.argv[2]
    with open(bp) as lines:
        for line in lines:
            obj = json.loads(line)
            p = obj['phone']
            if p in ads_phones:
                print obj['text']
                print p #phone that matches

def join_text():
    #load text
    text = ""
    bp = sys.argv[2]
    with open(bp) as lines:
        for line in lines:
            obj = json.loads(line)
            text += obj['text']
    whd = open(sys.argv[1], "rb")
    rows = csv.reader(whd)
    print "Done"
    
    c = 0
    for row in rows:
        companyname = row[2].split(",")[0].lower()
        if len(companyname) > 3:
            if companyname in text:
                print companyname

join_text()


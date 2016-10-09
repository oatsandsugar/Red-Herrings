import sys
from boilerpipe.extract import Extractor
import json
extractor_type = 'ArticleExtractor'
import re

infile = sys.argv[1]
outfile = sys.argv[2]
out = open(outfile, "w")
PHONE = re.compile("1?\W*( *[2-9] *[0-8] *[0-9] *)\W*( *[2-9] *[0-9] *[0-9] *)\W*([0-9] *[0-9] *[0-9] *[0-9] *)")

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

with open(infile) as lines:
    c = 0
    for line in lines:
        data = {}
        obj = json.loads(line)        
        if '_source' in obj:
            html = obj['_source']['raw_content']
            url = obj['_source']['url']
            try:
                extractor = Extractor(extractor=extractor_type, html=html)
                text = extractor.getText()
                match = PHONE.search(text)
                c += 1
                if match:
                    phone = format_phone(match.group(0))
                    data['text'] = text
                    data['url'] = url
                    data['phone'] = phone
                    out.write(json.dumps(data) + "\n")
            except:
                continue 

out.close()

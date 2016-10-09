import sys
from boilerpipe.extract import Extractor
import json
extractor_type = 'ArticleExtractor'
import re

infile = sys.argv[1]
outfile = sys.argv[2]
out = open(outfile, "w")

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
                data['text'] = text
                data['url'] = url
                out.write(json.dumps(data) + "\n")
            except:
                continue 

out.close()

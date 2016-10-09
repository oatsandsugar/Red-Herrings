import requests
import sys
import traceback
import json
import time
from yelpapi import YelpAPI
'''
This script provides 2 ways of obtaining data from Yelp, via APIs or crawling
'''

header = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'}

def crawl(query):
    try:
        res = requests.get(query, headers=header)
        if res.status_code == 200:
            data = {'url':q}
            t = res.text.encode('utf-8')
            data['text'] = t
            out.write(json.dumps(data) +"\n")
            print "Success: " + query

    except:
        traceback.print_exc()
        print "Failed: " + query

def gen_query(company, br):
    br = br.replace(" ", "+")
    company = company.replace(" ", "+")
    q = "https://www.yelp.com/search?find_desc=" + company + "&find_loc=" + br + "," + "NY"
    return q

ConsumerKey="your consumer key"
ConsumerSecret="consumer secret"
Token="token"
TokenSecret="token secret"
yelp_api = YelpAPI(ConsumerKey, ConsumerSecret, Token, TokenSecret)

def crawl_company():
    infile = sys.argv[1]
    outfile = sys.argv[2]
    out = open(outfile, "w")
    c = 0
    with open(infile) as lines:
        for line in lines:
            try:
                c += 1
                values = line.strip().split("\t")
                name = values[0]
                loc = values[1] + ", NY"
                response = yelp_api.search_query(term=name, location=loc, sort=0, limit=10)
                response['query'] = line.strip()
                out.write(json.dumps(response) + "\n")
                print "Success: " + line.strip()
            except:
                traceback.print_exc()
                print "Failed: " + line.strip()
    out.close()

def crawl_review():
    infile = sys.argv[1]
    outfile = sys.argv[2]
    out = open(outfile, "w")
    c = 0
    with open(infile) as lines:
        for line in lines:
            try:
                query, company = line.strip().split(",")
                c += 1
                response = yelp_api.business_query(id=company)
                response['query'] = query
                out.write(json.dumps(response) + "\n")
            except:
                traceback.print_exc()
                print "Failed: " + line.strip()
    out.close()
crawl_company()
crawl_review()

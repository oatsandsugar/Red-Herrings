import re
from difflib import SequenceMatcher
import sys

pattern=re.compile("[^\w']")


def gen_signature(string):
    string = string.lower()
    string = pattern.sub(' ', string)
    data = filter(None, string.split(' '))
    return ''.join([x for x in data if len(x) > 1])


class Entity():
    def __init__(self, name=None, addr=None, phone=None):
        self.name = name
        self.addr = addr
        self.phone = phone

    def similarity(self, other):
        score = 1.0
        if self.name and other.name:
            score *= SequenceMatcher(None, gen_signature(self.name), gen_signature(other.name)).ratio()
            if score == 0.0: #you do not want to penalize the score so much if the names are completely different because addresses matter more after all
              score = 0.5
        if self.addr and other.addr:
            score *= SequenceMatcher(None, gen_signature(self.addr), gen_signature(other.addr)).ratio()
        if self.phone and other.phone:
          if gen_signature(self.phone) != gen_signature(other.phone):
            score *= 0.5
        return score

if __name__ == "__main__":
  '''
  sys.argv[1] => dataset 1
  sys.argv[2] => field id 1
  sys.argv[3] => dataset 2
  sys.argv[4] => field id 2
  '''    

  f = open(sys.argv[1], 'r')
  lines1 = f.readlines()
  f.close()

  f = open(sys.argv[3], 'r')
  lines2 = f.readlines()
  f.close()

  vals1 = []
  vals2 = []

  for l in lines1:
    fields = l.strip().split(',')
    vals1.append(fields[int(sys.argv[2])])

  for l in lines2:
    fields = l.strip().split(',')
    vals2.append(fields[int(sys.argv[4])])

  ints = [val for val in vals1 if val in vals2]
  print ints


    

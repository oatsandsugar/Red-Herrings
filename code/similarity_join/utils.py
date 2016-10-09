import re
from difflib import SequenceMatcher


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
        if self.addr and other.addr:
            score *= SequenceMatcher(None, gen_signature(self.addr), gen_signature(other.addr)).ratio()
        if self.phone and other.phone:
            score *= SequenceMatcher(None, gen_signature(self.phone), gen_signature(other.phone)).ratio()
        return score


if __name__ == "__main__":
    print gen_signature("123-456-7890")
    print gen_signature("1234567890")

    e1 = Entity("Flynn's Tire & Auto Service", "718A Hope Hollow Rd\nCarnegie, PA 15106", "123-456-7890")
    e2 = Entity("Flynn's Tire Auto Service", "718A Hope Hollow Rd\nCarnegie, PA 15106", "1234567890")

    print e1.similarity(e2)
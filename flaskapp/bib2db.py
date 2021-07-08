import pymongo
from pymongo import MongoClient
import bibtexparser
import glob
import os
from config import Config

database_host = Config.MONGO_HOST
database_name = Config.DB_NAME
bib_directory = Config.BIB_DIR

bibfiles = glob.glob(os.path.join(bib_directory, "*.bib"))
print(f"Found bibfiles: {bibfiles}")
dbclient = MongoClient(database_host)[database_name]


for bib in bibfiles:
    with open(bib) as bibtex_file:
        bib_database = bibtexparser.load(bibtex_file)
        bib_list = bib_database.get_entry_list()
        for entry in bib_list:
            entry["filtered"] = False # other options are include or exclude 
            entry["notes"] = ""
            entry["tags"] = None
            entry["sourcefile"] = bib
        dbclient.entries.insert_many(bib_list)


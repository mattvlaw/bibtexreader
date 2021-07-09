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
inserts = []
duplicates = []

for bib in bibfiles:
    with open(bib) as bibtex_file:
        bib_database = bibtexparser.load(bibtex_file)
        bib_list = bib_database.get_entry_list()
        for entry in bib_list:
            exists = dbclient.entries.find_one({"ID": entry["ID"]})
            if not exists:
                entry["filtered"] = False # other options are include or exclude 
                entry["notes"] = ""
                entry["tags"] = None
                entry["sourcefile"] = bib
                entry["query"] = os.path.basename(bib).split(".")[0].replace("_"," ")
                entry["list"] = "unsorted"
                dbclient.entries.insert_one(entry)
                inserts.append(entry)
            else:
                duplicates.append(entry)

print(f"Inserted {len(inserts)}. Found {len(duplicates)} duplicates.")


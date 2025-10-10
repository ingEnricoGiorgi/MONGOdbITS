import os
import random
import json
from pymongo import MongoClient

from dotenv import load_dotenv

# Carica variabili da .env
load_dotenv()

# 1. Connessione sicura a MongoDB
uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME", "university")
collection_name = os.getenv("COLLECTION", "students_new_2")

client = MongoClient(uri)
db = client[db_name]
students = db[collection_name]

first_names = ["Emily", "John", "Sarah", "Michael", "Jessica", "Daniel", "Laura", "David", "Sophia", "James"]
last_names = ["Davis", "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Martinez", "Wilson"]
majors = ["Physics", "Mathematics", "Computer Science", "Biology", "Chemistry", "Economics", "History", "Engineering", "Philosophy", "Literature"]

def get_random_int(min_val, max_val):
    return random.randint(min_val, max_val)

# 2. Genera 100 documenti casuali
documents = []
for _ in range(100):
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    age = get_random_int(18, 30)
    # seleziona 3 major casuali uniche
    major = random.sample(majors, 3)
    documents.append({
        "name": name,
        "age": age,
        "major": major
    })

# 3. Inserisci nel database
students.insert_many(documents)
print(f" Inseriti {len(documents)} studenti nella collection '{collection_name}'")

# 4. Mostra un esempio
print(json.dumps(documents[:3], indent=2))

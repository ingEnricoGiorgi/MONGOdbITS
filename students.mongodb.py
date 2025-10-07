from pymongo import MongoClient
import random
import json

# 1. Connect to MongoDB
client = MongoClient('mongodb+srv://enricogiorgi92_db_user:sqKgWNNBMS9VY0Lt@cluster0.6dhmk95.mongodb.net/:')
db = client['university']
students = db['students_new_2']

first_names = ["Emily", "John", "Sarah", "Michael", "Jessica", "Daniel", "Laura", "David", "Sophia", "James"]
last_names = ["Davis", "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Martinez", "Wilson"]
majors = ["Physics", "Mathematics", "Computer Science", "Biology", "Chemistry", "Economics", "History", "Engineering", "Philosophy", "Literature"]

# Function to generate a random integer between min and max (inclusive)
def get_random_int(min_val, max_val):
    return random.randint(min_val, max_val)

# Generate 100 documents
documents = []
for _ in range(100):
    name = f"{first_names[get_random_int(0, len(first_names) - 1)]} {last_names[get_random_int(0, len(last_names) - 1)]}"
    age = get_random_int(18, 30)

    major = []
    while len(major) < 3:
        new_major = majors[get_random_int(0, len(majors) - 1)]
        if new_major not in major:
            major.append(new_major)
    # major = majors[get_random_int(0, len(majors) - 1)]
    documents.append({"name": name, "age": age, "major": major})

# print(documents)
print(json.dumps(documents, indent=2))

students.insert_many(documents)
import sqlite3
import json

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Create the countries table
cursor.execute('''
CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    population INTEGER,
    surface_area INTEGER,
    flag_description VARCHAR,
    prime_minister VARCHAR,
    government_type VARCHAR,
    capital VARCHAR
)
''')

# Create the cities table
cursor.execute('''
CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_id INTEGER,
    name VARCHAR,
    population INTEGER,
    latitude FLOAT,
    longitude FLOAT,
    is_capital BOOLEAN,
    FOREIGN KEY(country_id) REFERENCES countries(id)
)
''')

# Commit the table creation
conn.commit()

# Function to read JSON dataset from file
def read_json(file_path):
    with open(file_path, 'r', encoding='UTF8') as f:
        data = json.load(f)
    return data

# Function to insert data into the countries table
def insert_countries(country_data):
    cursor.execute('''
        INSERT INTO countries (name, population, surface_area, flag_description, prime_minister, government_type, capital)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        country_data['country'],
        country_data['population'],
        country_data['surface_area'],
        country_data['flag_description'],
        country_data['prime_minister'],
        country_data['government_type'],
        country_data['capital']
    ))
    conn.commit()
    
    # Get the country ID for further use when inserting cities
    return cursor.lastrowid

# Function to insert data into the cities table using country ID
def insert_cities(country_id, cities_data, capital_city_name):
    for city in cities_data:
        is_capital = city['city_name'] == capital_city_name
        cursor.execute('''
            INSERT INTO cities (country_id, name, population, latitude, longitude, is_capital)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            country_id,
            city['city_name'],
            city['city_population'],
            city['city_coordinates']['latitude'],
            city['city_coordinates']['longitude'],
            is_capital
        ))
    conn.commit()

# Main function to read data and insert into database
def main():
    # Replace 'dataset.json' with your JSON dataset file path
    json_data = read_json('europe_population.json')
    
    # Loop through the dataset and insert data into countries and cities tables
    for country_data in json_data:
        # print(country_data)
        country_id = insert_countries(country_data)
        insert_cities(country_id, country_data['largest_cities'], country_data['capital'])
    
    print("Data inserted successfully.")

if __name__ == '__main__':
    main()

# Close the connection when done
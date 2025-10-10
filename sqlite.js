-- SQLite
/*

*/
-- 1. Find a country by name:

SELECT * FROM Countries WHERE name = 'Germany';


-- 2. Find countries with a population greater than 50 million:

SELECT * FROM Countries WHERE population > 50000000;


-- 3. Find countries with a surface area less than 100,000 km²:

SELECT * FROM Countries WHERE surface_area < 100000;


-- 4. List all countries with their capitals:

Select name AS country, capital from countries;

SELECT co.name AS country
, ct.name AS capital 
, case when ct.is_capital = 1 then ct.population else 'Not a capital' end as population
FROM countries as co
JOIN cities as ct ON ct.country_id = co.id 
--and ct.is_capital = 1;


-- 5. Find countries where the prime minister's name starts with 'O':

SELECT * FROM Countries WHERE prime_minister LIKE 'O%';


-- 6. Count the number of countries with a population over 10 million:

SELECT COUNT(*) FROM Countries WHERE population > 10000000;


-- 7. List countries ordered by population in descending order:

SELECT * FROM Countries ORDER BY population DESC;


-- 8. Get the average population of all countries:

SELECT AVG(population) AS average_population FROM Countries;


-- 9. Find the total surface area of all countries combined:

SELECT SUM(surface_area) AS total_surface FROM Countries;


-- 10. Find countries where the biggest city population is greater than 1 million:

SELECT DISTINCT Countries.*
FROM Countries
JOIN Cities ON Countries.id = Cities.country_id
WHERE Cities.population > 1000000;


-- 11. List all countries with their government type:

SELECT name, government_type FROM Countries;


-- 12. Find countries where the capital's population is less than 500,000:

SELECT Countries.*
FROM Countries
JOIN Cities ON Countries.capital_city_id = Cities.id
WHERE Cities.population < 500000;


-- 13. Get the top 5 countries by population:

SELECT * FROM Countries ORDER BY population DESC LIMIT 5;


-- 14. Find countries with a flag description containing the word 'red':

SELECT * FROM Countries WHERE flag_description LIKE '%red%';


-- 15. Get the total population of all the biggest cities in Europe:

SELECT SUM(Cities.population) AS total_city_population
FROM Cities
JOIN Countries ON Cities.country_id = Countries.id;

-- 17. List all capitals and their countries:

SELECT Cities.name AS capital, Countries.name AS country
FROM Countries
JOIN Cities ON Countries.id = Cities.country_id and Cities.is_capital = 1  ;


-- 18. Find countries where the biggest city's name is 'Paris':

select *
from Countries
where capital='Paris'

SELECT Countries.*
FROM Countries
JOIN Cities ON Countries.id = Cities.country_id
WHERE Cities.name = 'Paris';


-- 25. Find countries with a population between 10 million and 50 million:

SELECT * FROM Countries WHERE population BETWEEN 10000000 AND 50000000;


-- 29. Find countries where the capital city is also the largest city:

select countries.name, ranked_cities.name, ranked_cities.population
--, case when ranked_cities.is_capital = 1 then 'Capital' else 'Not a capital' end as city_type 
from 
(select country_id, name, is_capital, population 
    ,row_number() over (partition by country_id order by population desc) as rn
from cities 
order by country_id, population desc
) as ranked_cities
join countries on ranked_cities.country_id = countries.id
where rn = 1 
and ranked_cities.is_capital = 1;


-- 30. List countries where the flag description contains more than one color:

SELECT * FROM Countries WHERE flag_description LIKE '% and %';


-- 31. Get the total population of the top 10 largest countries by surface area:

SELECT SUM(population) AS total_population
FROM Countries
ORDER BY surface_area DESC
LIMIT 10;



//////////////////////////////////////////////
//	MONGO DB
/////////////////////////////////////////////

/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
const database = 'world';
use(database);
const collection = db.europe;


// 1. Find a country by name:
// collection.find({ "country": "Germany" });

// 2. Find countries with a population greater than 50 million:
// collection.find({ "population": { $gt: 50000000 } });

// 3. Find countries with a surface area less than 100,000 km²:
// collection.find({ "surface_area": { $lt: 1000 } });

// 4. List all countries with their capitals:

// collection.find({}, { "country": 1, "capital": 1 , _id:0});

// 5. Find countries where the prime minister's name starts with 'O':
// collection.find({ "prime_minister": { $regex: "^O" } });
// collection.find({ "prime_minister": { $regex: /^O/ } });
// collection.find({ "prime_minister": /^O/ });
// collection.find({ "prime_minister": "^O" });

// 6. Count the number of countries with a population over 10 million:
// collection.count({ "population": { $gt: 10000000 } });
// collection.find({ "population": { $gt: 10000000 } }).count();
// collection.count();

// 7. List countries ordered by population in descending order:
// collection.find().sort({ "population": -1 });

// 8. Find countries with the biggest city population greater than 1 million:
// collection.find({ "largest_cities.city_population": { $gt: 2500000 } });

// 9. List all countries with their government type:
// collection.find({}, { "country": 1, "government_type": 1, _id: 0 });

// 10. Find countries where the second largest city has a population greater than 1.3 million:
// collection.find({ "largest_cities.1.city_population": { $gt: 1300000 } });

// 11. Get the top 5 countries by population:
// collection.find().sort({ "population": -1 }).limit(5);

// 12. Find countries with a flag description containing the word 'red':
// collection.find({ "flag_description": { $regex: "tripes", $options: "i" } });

// 13. Find countries where the prime minister's name contains 'Sch':
// collection.find({ "prime_minister": { $regex: "Sch", $options: "i" } });

// 14. List all capitals and their countries:
// collection.find({}, { "country": 1, "capital": 1 });

// 15. Find countries where the biggest city's name is 'Paris':
// collection.find({ "largest_cities.city_name": "Paris" })

// ------------Aggregation Pipeline Queries-------------------

// 16. Get the total population of all the biggest cities in Europe (Aggregation):
// collection.aggregate([
//     { $unwind: "$largest_cities" },
//     { $group: { _id: null, totalCityPopulation: { $sum: "$largest_cities.city_population" } } }
// ]);

// 17. Get the average population of all countries (Aggregation):
// collection.aggregate([
//     { $group: { _id: null, averagePopulation: { $avg: "$population" } } }
// ]);

// collection.aggregate([
//     { $group: { _id: "$_id", averagePopulation: { $avg: "$population" } } }
// ]);

// 18. Find the total surface area of all countries combined (Aggregation):
// collection.aggregate([
//     { $group: { _id: null, totalSurface: { $sum: "$surface_area" } } }
// ]);

// 19. List the top 10 countries by population:
// collection.aggregate([
//     { $sort: { population: -1 } },  
//     { $limit: 10 },
//     { $project: { _id: 0, alias_country: "$country", population: 1 } }
// ]); 

// 20. Count the number of countries with a population greater than 10 million:
// collection.aggregate([
//     { $match: { population: { $gt: 10000000 } } },
//     // { $count: "countriesOver10Million" }
//     { $group: { _id: null, count: { $sum: 1 } } },
//     { $project: { _id: 0, countriesOver10Million: "$count" } }
// ]); 

// 21. Find the country with the largest surface area:
// collection.aggregate([
//     { $sort: { surface_area: -1 } },    
//     { $limit: 1 },  
//     { $project: { _id: 0, country: "$country", surface_area: 1 } }
// ]);

// 22. Find countries with a population greater than 50 million:
// collection.aggregate([
//     // { $match: { $expr: { $gt: ["$population", 50000000] } } },
//     { $match: { population: { $gt: 50000000 } } },
//     {$limit:2},
//     { $group: { _id: null, totalPopulation: { $sum: "$population" } } }
//     // ,{$limit:2}
// ]); 


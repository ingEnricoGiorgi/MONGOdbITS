use('miodb');

  // 2. Create a new collection.
//   db.createCollection(collection);
const collection = db.getCollection('students_new');

  // Sample data for names, ages, and majors
  const firstNames = ["Emily", "John", "Sarah", "Michael", "Jessica", "Daniel", "Laura", "David", "Sophia", "James"];
  const lastNames = ["Davis", "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Martinez", "Wilson"];
  const majors = ["Physics", "Mathematics", "Computer Science", "Biology", "Chemistry", "Economics", "History", "Engineering", "Philosophy", "Literature"];

   // Function to generate a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate 100 documents
  let documents = [];
  for (let i = 0; i < 100; i++) {
      let name = `${firstNames[getRandomInt(0, firstNames.length - 1)]} ${lastNames[getRandomInt(0, lastNames.length - 1)]}`;
      // let name = '"'+firstNames[getRandomInt(0, firstNames.length - 1)]+" "+lastNames[getRandomInt(0, lastNames.length - 1)]+'"';
      let age = getRandomInt(18, 30);
      let major =[];
      while (major.length < 3) {
        major_new= majors[getRandomInt(0, majors.length - 1)];
        if (!major.includes(major_new) ){
          major.push(major_new);
        }
    }
    //   let major = majors[getRandomInt(0, majors.length - 1)];
      documents.push({ name: name, age: age, major: major });
  }

  // Print the documents
  console.log(JSON.stringify(documents, null, 2));
    // Insert the documents into the collection
  collection.insertMany(documents);
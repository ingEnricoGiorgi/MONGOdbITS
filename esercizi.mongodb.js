use('miodb');
/*
db.students_new.find({
  $and: [
    { age: { $gt: 23 } },
    { major: "Biology" }
  ]
})

db.students_new.find({
  $or: [
    { major: "Mathematics" },
    { major: "Physics" }
  ]
})


db.students_new.find({major: { $ne: "History" }})


db.students_new.find({
  $nor: [
    { major: "Biology" },
    { age: { $gt: 25 } }
  ]
})


db.students_new.find({
  $nor: [
    { major: "Engineering" },
    { age: { $lt: 22 } }
  ]
})

db.students_new.find({
  $nor: [
    { major: "Engineering" },
    { age: { $lt: 22 } }
  ]
})  

//non si puo fare name:
db.students_new.find({
  major: { $elemMatch: { name: "Computer Science" } }
}) 

db.students_new.find({
  major: "Computer Science"
}) 


db.students_new.find({ major: { $size: 3 } });
 */

//---------------------------------------


//db.students_new.find({ name: "John Williams" }).explain()


// db.students_new.find({ age: 22 });


//db.students_new.find({ major: "Biology" });


//db.students_new.find({ major: "Computer Science", age: { $gt: 26 } });


//db.students_new.find({ major: "History", age: { $lt: 25 } });


//db.students_new.find({ major: "Physics", age: { $gte: 21 } });

 //db.students_new.find({ age: { $ne: 24 } });


//db.students_new.find({ major: { $in: ["Physics", "Mathematics", "Biology"] } });


db.students_new.find({ major: { $nin: ["History", "Economics"] } });


//shift +alt+a
//ctrl+k+c      e     ctrl+k+u
//shift+alt

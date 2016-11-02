const dbConnection = require("../config/mongoConnections");
const data = require("../data/");
const info=data.info;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return info.addSchoolinfo("GNITS", "undergrad","bachelors");
    }).then(() => {
        //const id = phil._id;

        return info.addSchoolinfo("DAV", "lowschool","school");
           // .addPost("Hello, class!", "Today we are creating a blog!", id)
    }).then(() => {
        return info.addSchoolinfo("Gayatri", "highschool","Intermediate");
    }).then(() => {
        return info.addSchoolinfo("stevens", "Masters","mastersdegree");
        
    }).then(() => {
        return info.addHobbyinfo("Cook", "Cooking helps me relax.I am a great cook");
        
    }).then(() => {
        return info.addHobbyinfo("read", "I love reading books");
        
    }).then(() => {
        return info.addHobbyinfo("Watch movies", "i like watching movies from different genre");
        
    }).then(() => {
        return info.addCourseinfo("Web programming", "CS546","Phil Baresi","we learn nodejs in this course");
        
    }).then(() => {
        return info.addCourseinfo("HCI", "CS545","Greg vessonder","we learn about userexperience in this course");
        
    }).then(() => {
        return info.addCourseinfo("Web analytics", "BIA660","Theodoros Lappas","we learn web scrapping in this course");
        
    }).then(() => {
        return info.addCourseinfo("Cybersecurity", "CS576","Edward Amoroso","we learn security protocols in this course");
        
    }).then(() => {
        return info.addCourseinfo("Alogorithms", "CS548","Tim","we learn building algorithms in this course");
        
    }).then(() => {
        return info.addCourseinfo("Database", "CS575","Teddy","we work with database in this course");
        
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
const mongoCollections = require("../config/mongoCollections");
const education = mongoCollections.education;
const hobbies = mongoCollections.hobbies;
const courses = mongoCollections.courses;
const uuid = require('node-uuid');

let exportedMethods = {

    getAllSchools(){
        return education().then((educationCollection) => {
            return educationCollection.find({},{schoolname :1,_id:0}).toArray();
        }).then((school) => {
                if (school.length === 0) return Promise.reject("404");
                return school;
        });
    },

    getSchoolbyLevel(levels){
        return education().then((educationCollection)=>{
            return educationCollection.findOne({level:levels},{schoolname:1,_id:0})
            }).then((school) => {
                if (!school) return Promise.reject();
                return school;
        });
    },

    getSchoolanddegree(levels){
        return education().then((educationCollection)=>{
            return educationCollection.findOne({level:levels},{schoolname:1,degree:1,_id:0})
            }).then((school) => {
                if (!school) return Promise.reject();
                return school;
        });
    },

    getschoolById(id) {
        return education().then((educationCollection) => {
            return educationCollection.findOne({ _id: id })
            }).then((school) => {
                if (!school) return Promise.reject();
                return school;
            });
    },

    addSchoolinfo(schoolname,level,degree){
        return education().then((educationCollection) => {
            let schoolinfo = {
                schoolname: schoolname,
                level: level,
                degree:degree,
                _id: uuid.v4()
            };

            return educationCollection.insertOne(schoolinfo)
        }).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
        }).then((newId) => {
            return this.getschoolById(newId);
        });

    },

//hobbbies
    getAllHobbies(){
        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.find({},{hobbiename:1,_id:0}).toArray();
        }).then((hobby) => {
                if (hobby.length === 0) return Promise.reject("404");
                return hobby;
        });
    },
    
    getHobbieDesc(hobby){
        return hobbies().then((hobbiesCollection)=>{
            return hobbiesCollection.findOne({hobbiename:hobby},{desc:1,_id:0})
            .then((desc)=>{
                if(!desc)
                    return Promise.reject();
                return desc;
            });
        }).then((hobbies) => {
                if (!hobbies) return Promise.reject();
                return hobbies;
        });
    },
    
    getHobbieById(id) {
        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.findOne({ _id: id }).then((hobby) => {
                if (!hobby) throw "hobbie not found";
                return hobby;
            });
        }).then((hobbies) => {
                if (!hobbies) return Promise.reject();
                return hobbies;
        });
    },

    addHobbyinfo(hobbiename,desc){
        return hobbies().then((hobbiesCollection) => {
            let hobbieinfo = {
                hobbiename: hobbiename,
                desc: desc,
                _id: uuid.v4()
            };

            return hobbiesCollection.insertOne(hobbieinfo)
        }).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
        }).then((newId) => {
                return this.getHobbieById(newId);
        }).then((hobbies) => {
                if (!hobbies) return Promise.reject();
                return hobbies;
        });
    },
//classes

    getAllCourses(){
         return courses().then((courseCollection) => {
            return courseCollection.find({},{'courseinfo.coursecode':1,_id:0}).toArray();
        }).then((course) => {
                if (course.length === 0) return Promise.reject("404");
                return course;
        });
    },
    
    getCourseDetails(coursecode){
        return courses().then((courseCollection)=>{
            return courseCollection.findOne({'courseinfo.coursecode':coursecode},{'courseinfo.coursecode':0,_id:0});
        }).then((courseDetails) => {
            if (!courseDetails) return Promise.reject();
            return courseDetails;
        });
    },

    getCourseById(id) {
        return courses().then((courseCollection) => {
            return courseCollection.findOne({ _id: id })
        }).then((course) => {
            if (!course) return Promise.reject();
            return course;
        });
    },    
    
    addCourseinfo(coursename,coursecode,professor,coursedesc){
        return courses().then((courseCollection) => {
            let course_info = {
                courseinfo: {
                    coursename: coursename,
                    coursecode: coursecode,
                    professor: professor,
                    coursedesc: coursedesc
                },
                _id: uuid.v4()
            };

            return courseCollection.insertOne(course_info)
        }).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
        }).then((newId) => {
                return this.getCourseById(newId);
        });
    }
}
module.exports = exportedMethods;

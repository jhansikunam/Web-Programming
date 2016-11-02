const express = require('express');
const router = express.Router();
const data = require("../data");
const peopledata=data.people;
const eventdata=data.events;

// Single Person Page
router.get("/:id", (req, res) => {
    // Find a person by the provided id, 
    // then display their information
    // As well as listing all events that they will be attending
    // Each of these events need to link to the event page, and show the event name
    // If a person is not found, display the 404 error page
    let peopleinfo={};
    peopledata.getPerson(parseInt(req.params.id)).then((people) =>{
        
        peopleinfo.name=people.name;
        peopleinfo.eventlist=[];
        return people;
    }).then((people)=>{
        return eventdata.getEventsForAttendee(people.id).then((info)=>{
            info.forEach(function(x){
               peopleinfo.eventlist.push(x);
            });
            
            console.log(peopleinfo);
            res.render('people/single', { peopleinfo: peopleinfo });
        }).catch((e)=>{
                console.log(e);
            });
    }).catch(()=>{
        res.status(404).render('misc/static',{})

    });
        
        

    });
  //  res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });


// People Index Page
router.get("/", (req, res) => {
    // Display a list of all people; it can be in an unordered list, or a table
    // Each of these people need to link to the single person page
    peopledata.getAllPeople().then((peoplelist) =>{
        res.render('people/index',{people : peoplelist});
    });
   // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;
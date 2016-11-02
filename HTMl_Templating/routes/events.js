const express = require('express');
const router = express.Router();
const data = require("../data");
const eventdata=data.events;
const persondata=data.people;
const locationdata = data.locations;

// Single Event Page
router.get("/:id", (req, res) => {
    // Find a event by the provided id, 
    // then display its information
    // As well as listing the names of all the attendees that will be at this event 
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page

    // If a event is not found, display the 404 error page
    let eventinfo = {}

    eventdata.getEvent(parseInt(req.params.id)).then((event) =>{
            eventinfo.title = event.title,
            eventinfo.startTime = event.startTime,
            eventinfo.description = event.description,
            eventinfo.name = []
            event.attendees.forEach(function(person){
            persondata.getPerson(person).then((peopledata)=>{
                eventinfo.name.push(peopledata);                
            });
        });
        return event;
    }).then((event)=> {
        return locationdata.getLocation(event.location).then((location_details)=>{            
                eventinfo.location = location_details;
                console.log(eventinfo);
                res.render('events/single', { eventinfo: eventinfo });
            });
    }).catch(()=>{
        res.status(404).render('misc/static',{})

    })
    
    
    
    
    
  //  res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Event Index Page
router.get("/", (req, res) => {
    // Display a list of all events; it can be in an unordered list, or a table
    // Each of these events need to link to the single event page
    eventdata.getAllEvents().then((eventlist)=>{
        res.render('events/index',{ Eventlist : eventlist});
    })

    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;
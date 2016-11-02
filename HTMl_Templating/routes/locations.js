const express = require('express');
const router = express.Router();
const data = require("../data");
const locationdata=data.locations;
const eventdata=data.events;

// Single Location Page
router.get("/:id", (req, res) => {
    // Find a location by the provided id, 
    // then display its information
    // As well as listing all events that will be at this location
    // Each of these events need to link to the event page and show the event name
    // If a location is not found, display the 404 error page
    let locationinfo={};
    locationdata.getLocation(parseInt(req.params.id)).then((location_details) =>{
        locationinfo.name=location_details.name;
        locationinfo.location=location_details.location;
        locationinfo.eventslist=[];
        return location_details;
    }).then((location_details)=>{
        return eventdata.getAllEvents().then((eventinfo)=>{
            eventinfo.forEach(function(x){
                if(x.location === location_details.id){
                    locationinfo.eventslist.push(x);
                }
            });
             console.log(locationinfo);
             res.render('locations/single', { locationinfo: locationinfo });
        });

    }).catch(()=>{
        res.status(404).render('misc/static',{})

    })

        

    
    
   // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Location Index Page
router.get("/", (req, res) => {
    // Display a list of all locations; it can be in an unordered list, or a table
    // Each of these locations need to link to the single location page
    locationdata.getAllLocations().then((Locationlist)=>{
        res.render('locations/index',{ Locationlist : Locationlist});
    });

   // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const data = require("../data");
const infoData = data.info;

router.get("/:highschool", (req, res) => {

    if(req.params.highschool === "undergrad"){
            infoData.getSchoolanddegree(req.params.highschool).then((level) => {
            res.status(200).json({level});
        }).catch((error) => {
            // Not found!
            res.sendStatus(404);
        })
    }
    else{
            infoData.getSchoolbyLevel(req.params.highschool).then((level) => {
            res.status(200).json({level});
        }).catch((error) => {
            // Not found!
            res.sendStatus(404);
        });
    }    
});

router.get("/", (req, res) => {
    infoData.getAllSchools().then((schoolList) => {
        res.status(200).json({schoolList});
    }).catch((error)=>{
        if(error === "404")
            res.sendStatus(404);
        else
            res.sendStatus(500);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const data = require("../data");
const infoData = data.info;
const url=require('url');

router.get("/details", (req, res) => {
    var urlparts=url.parse(req.url, true);
    var query = urlparts.query;
    var send=query.code;

    infoData.getCourseDetails(query.code.replace(/[{}]/g, "")).then((coursedesc) => {
        res.status(200).json({coursedesc});
    }).catch((error) => {
        // Not found!
        res.status(404).send({message: "Post not found"});
    });
});

router.get("/", (req, res) => {
    infoData.getAllCourses().then((courseList) => {
        res.status(200).json({courseList});
    }).catch((error)=>{
        console.log(error);
        if(error === "404")
            res.sendStatus(404);
        else
            res.sendStatus(500);
    });
});

module.exports = router;
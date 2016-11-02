const express = require('express');
const router = express.Router();
const data = require("../data");
const infoData = data.info;

router.get("/:hobby", (req, res) => {
    infoData.getHobbieDesc(req.params.hobby).then((hobbydesc) => {
        res.status(200).json({hobbydesc});
    }).catch((error) => {
        // Not found!
        res.sendStatus(404);
    });
});

router.get("/", (req, res) => {
    infoData.getAllHobbies().then((hobbyList) => {
        res.status(200).json({hobbyList});
    }).catch((error)=>{
        if(error === "404")
            res.sendStatus(404);
        else
            res.sendStatus(500);
    });
});

module.exports = router;
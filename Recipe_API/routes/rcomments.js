const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipe;

router.post("/:recipeId", (req, res) => {
    let commentData = req.body;
    let recipeinfo=recipeData.getRecipeById(req.params.recipeId);

    recipeinfo.then(()=>{
        return recipeData.addCommentInfo(req.params.recipeId,commentData)
        .then((newcomment) => {
            res.json(newcomment);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
    }).catch(() => {
        res.status(404).json({ error: "recipe not found" });

    });
});
    

router.delete("/:id", (req, res) => {
    let comment=recipeData.getRecipeByComment(req.params.id);

    comment.then(()=>{
        return recipeData.deleteComment(req.params.id).then(()=>{
            res.sendStatus(200);
        }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found" });
      });
});
     

router.put("/:recipeId/:commentId", (req, res) => {
    let updatedData = req.body;

    let getRecipe = recipeData.getRecipeById(req.params.recipeId);

    getRecipe.then(() => {
        recipeData.updateComment(req.params.recipeId,req.params.commentId,updatedData).then((updatedRecipe) => {res.json(updatedRecipe);}).catch((e) => {res.status(500).json({ error: e });});
    }).catch(() => {
        res.status(404).json({ error: "recipe not found" });
    });

});



router.get("/recipe/:recipeId",(req, res) => {
    
    recipeData.getRecipeById(req.params.recipeId).then((Recipedesc) => {
        let comarray=Recipedesc.comments;
    
        let newjsonarray=[];
        comarray.forEach(function(word){
            let jsonnew={
             _id:word._id,
             recipeId:Recipedesc._id,
             reciipetitle:Recipedesc.title,
             name:word.comment,
             poster:word.poster
            }
            newjsonarray.push(jsonnew);
        });
        res.status(200).json(newjsonarray);
    }).catch((error) => {
    
        // Not found!
        res.status(404).json({ error: "recipe not found" });
    });
});

router.get("/:commentId",(req, res) => {
    
    recipeData.getRecipeByComment(req.params.commentId).then((Recipedesc) => {

        let desiredComment = Recipedesc.comments.filter((comment)=>{
            if (comment._id == req.params.commentId){
                return true
            }
            else{
                return false
            }
        })[0]
        let newcomment={
            _id:desiredComment._id,
            recipeId:Recipedesc._id,
            recipetitle:Recipedesc.title,
            name:desiredComment.comment,
            poster:desiredComment.poster
        }
        res.status(200).json(newcomment);
    }).catch((error) => {
        console.log(error);
        // Not found!
        res.status(404).json({ error: "not valid ID " });
    });
});



module.exports = router;
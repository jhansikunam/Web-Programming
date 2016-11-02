const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipe;
const url=require('url');

router.get("/:id", (req, res) => {
    recipeData.getRecipeById(req.params.id).then((Recipedesc) => {
        res.json(Recipedesc);
    }).catch(() => {
        // Not found!
        res.status(404).json({error:"Recipe not found"});
    });
});

router.get("/", (req, res) => {
    recipeData.getAllRecipes().then((RecipeList) => {
        res.json(RecipeList);
    }).catch((e)=>{
        if(error === "404")
            res.status(404).json({error:"Recipes List not found"});
        else
            res.status(500).json({ error: e});
    });
});

router.post("/", (req, res) => {
    let recipePostData = req.body;
    
    recipeData.addRecipeInfo(recipePostData.title, recipePostData.ingredients,recipePostData.steps,recipePostData.comments)
        .then((newrecipe) => {
            res.json(newrecipe);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getRecipe = recipeData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipeData.updateRecipe(req.params.id, updatedData)
            .then((updatedRecipe) => {
                res.json(updatedRecipe);
            }).catch((e) => {
                res.status(500).json({ error: e});
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

router.delete("/:id", (req, res) => {
    let getRecipe = recipeData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipeData.removeRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found with given ID" });
    });
});



module.exports = router;
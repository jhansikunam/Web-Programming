const mongoCollections = require("../config/mongoCollections");
const recipe = mongoCollections.recipe;
const comments = mongoCollections.comments;
const uuid = require('node-uuid');

let exportedMethods = {

    getAllRecipes(){
        return recipe().then((recipeCollection) => {
            return recipeCollection.find({},{title: 1,_id: 1}).toArray();
        }).then((recipeinfo) => {
                if (recipeinfo.length === 0) return Promise.reject("404");
                return recipeinfo;
        });
    },

    getRecipeById(id) {
        if(!id) return Promise.reject("You must provide an ID");
        return recipe().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: id });
            }).then((recipeinfo) => {
                if (!recipeinfo) return Promise.reject();
                return recipeinfo;
            });
    },

    addRecipeInfo(title,ingredients,steps,comments){
        if(typeof title !== "string") 
            return Promise.reject("title provided should be string");
        if (!Array.isArray(steps)) {
            return Promise.reject("provide array for steps");
        }
        if (!Array.isArray(comments)) {
            return Promise.reject("provide array for comments");
        }
        if (!Array.isArray(ingredients)) {
            return Promise.reject("provide array for ingredients");
        }
        
        return recipe().then((recipeCollection) => {
        
            var makedoc = {
             
                title:title,
                ingredients:ingredients,
                steps:steps,
                comments:comments,
                _id: uuid.v4()
    
            };
            
          
        
           return recipeCollection.insertOne(makedoc)
        }).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
        }).then((newId) => {
            return this.getRecipeById(newId);
        });

    },

    updateRecipe(id, updatedRecipe) {
        if (!id) return Promise.reject("You must provide an ID");
        if(!updatedRecipe) return Promise.reject("You must provide details to update");
        return recipe().then((recipeCollection) => {
            let updatedRecipeData = {};

            if (updatedRecipe.ingredients) {
                updatedRecipeData.ingredients = updatedRecipe.ingredients;
            }

            if (updatedRecipe.title) {
                updatedRecipeData.title = updatedRecipe.title;
            }

            if (updatedRecipe.steps) {
                updatedRecipeData.steps = updatedRecipe.steps;
            }
            if (updatedRecipe.comments) {
                updatedRecipeData.comments = updatedRecipe.comments;
            }


            let updateCommand = {
                $set: updatedRecipeData
            };

            return recipeCollection.updateOne({
                _id: id
            }, updateCommand).then((result) => {
                if(result.matchedCount === 0){
                    throw ("couldnot update");
                    //return Promise.reject("not update entry");
                }else{
                return this.getRecipeById(id);
                }
            });
        });
    },

    removeRecipe(id){
        if (!id) return Promise.reject("You must provide an ID");
        return recipe().then((recipeCollection) => {
            return recipeCollection
                .removeOne({_id: id})
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw('Could not delete recipe with given id');
                    } else {}
                });
        });
    },

//comments

addCommentInfo(id,commentData){
    if (!id) return Promise.reject("You must provide an ID");
    if(typeof commentData.comment !== "string") 
            return Promise.reject("comment provided should be string");
    if(typeof commentData.poster !== "string") 
            return Promise.reject("poster provided should be string");
    if(!commentData) return Promise.reject("You must provide an info");
    
    return recipe().then((recipeCollection) =>{
        return this.getRecipeById(id).then((recipeData)=>{
            let newcomment={
                _id : uuid.v4(),
                poster : commentData.poster,
                comment: commentData.comment
            };
    
            return recipeCollection.update({_id:id},{$addToSet: { "comments": newcomment } }).then((result)=>{
                if(result.matchedCount === 0){
                    throw ("couldnot update comments");
                }else{
                return recipeCollection.findOne({_id:id},{comments:1,_id:0});
                }
            });

    });
    });
},


deleteComment(id){
    if (!id) return Promise.reject("You must provide an ID");
    return recipe().then((recipeCollection)=>{
        return recipeCollection.update({},{$pull:{"comments":{_id:id}}},{multi:true}).then((deletionInfo)=>{
            
            
            if(deletionInfo.matchedCount === 0) return Promise.reject("No comment with ID");
            else {
                
            }


        });
    });
},




updateComment(recipeid,commentid, updatedComment) {
    
        return recipe().then((recipeCollection) => {
            return this.getRecipeById(recipeid).then((recipeData)=>{

                let updateCommand = {}


                if (updatedComment.poster) {
                    updateCommand = {
                      $set: {"comments.$.poster":updatedComment.poster}
                   }
                   recipeCollection.updateOne({_id:recipeid,'comments._id':commentid}, updateCommand)
                }

                if (updatedComment.comment) {
                
                   updateCommand = {
                      $set: {"comments.$.comment":updatedComment.comment}
                  }

                }
            
              
               return recipeCollection.updateOne({_id:recipeid,'comments._id':commentid}, updateCommand)
                .then((secondupdate)=>{
                   if(secondupdate.matchedCount === 0){
                       throw "couldnt update comments";
                   }
                 return this.getRecipeById(recipeid);
                
             });
                
            
      });  
     });
    },

getRecipeByComment(id) {
        return recipe().then((recipeCollection) => {
            return recipeCollection.findOne({ "comments._id": id });
            }).then((recipeinfo) => {
                if (!recipeinfo) return Promise.reject();
                return recipeinfo;
            });
    },

/*getonlycomment(id){
    return recipe().then((recipeCollection) => {
            return recipeCollection.find({ "comments": { $elemMatch: { "_id": id } } })
            }).then((recipeinfo) => {
                if (!recipeinfo) return Promise.reject("getrecipebyCommentrejected");
                return recipeinfo;
            });
},*/




 
}
module.exports = exportedMethods;

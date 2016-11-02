
const mongoCollections = require("./mongoCollections");
const todo = mongoCollections.todoItems;
var uuid = require('node-uuid');

let exportedMethods = {

    getTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        return todo().then((todoCollection) => {
            return todoCollection.findOne({_id: id })
            .then((getinfo)=>{
                if(!getinfo){
                    return Promise.reject("task doesnot exist");
                }
                return getinfo;
            });
        });
    },

    getAllTasks(){
        return todo().then((todoCollection)=>{
            return todoCollection.find().toArray().then((docs)=>{
                if (docs.length === 0){
                    return Promise.reject("No items to return");
                }
                else
                    return docs;
                
            });    
        });
    
    },

    createTask(title, description){
        if (!title) 
            return Promise.reject("You must provide a title");
        if (!description) 
            return Promise.reject("You must provide description for task");
        return todo().then((todoCollection) => {
            
            let newitem={
                _id:uuid.v1(),
                title: title,
                desc: description,
                completed: false,
                completedAt: null
            };
            
            return todoCollection.insertOne(newitem)
                    .then((newInsertInformation) => {
                        if (newInsertInformation.insertedCount === 0) {
                            return Promise.reject("No tasks are inserted");
                        }
                        return newInsertInformation.insertedId;
                    }).then((newId) => {
                        return this.getTask(newId);
                    
                    });
        });
    },

    CompleteTask(taskId){
        if (!taskId) 
            return Promise.reject("Task Id not provided for update");
         return todo().then((todoCollection)=>{
                var currenttime=new Date();
                let updated = {
                    $set:{
                        completed:true,
                        completedAt:currenttime
                    }
                };

                return todoCollection.updateOne({_id : taskId},updated)
                    .then((updresult)=>{
                        if (updresult.matchedCount === 0){
                            return Promise.reject("No tasks matched to update");
                        }
                        else
                            return updresult;
                });
            });
    },
            
    removeTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        return todo().then((todoCollection) => {
            return todoCollection.removeOne({_id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    return Promise.reject("There is no such task to remove")
                }
            });
        });
    }

}

module.exports = exportedMethods;
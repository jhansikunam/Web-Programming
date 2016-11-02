const todoItems = require("./todo");
const connection = require("./mongoConnection");
var uuid = require('node-uuid');
var task_ids = [];


let createdTask = todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");

let firsttask = createdTask.then((newTask_first) => {
    console.log("First task created");
    console.log(newTask_first);
    task_ids.push(newTask_first._id);
}).then(() =>{
    return todoItems.createTask("Play Pokemon with Twitch TV","Should we revive Helix?");     
}).then((newTask_second) =>{
    task_ids.push(newTask_second._id);
}).then(()=>{
     return todoItems.getAllTasks();
}).then((all)=>{
    console.log("Logging all tasks");
    console.log(all);
}).then(() =>{
    console.log("Removing 1st Task");
    return todoItems.removeTask(task_ids[0]);
}).then(()=>{
    console.log("Logging all tasks after removing");
    return todoItems.getAllTasks();
}).then((rest)=>{
    console.log(rest);
}).then(()=>{
    console.log("Completing task");
    return todoItems.CompleteTask(task_ids[1]); 
}).then(()=>{
    console.log("Remaining Task");
    return todoItems.getAllTasks();
}).then((remTask)=>{
    console.log(remTask); 
});


firsttask.catch((error)=>{
    console.log(error); 
}).then(() => {
    return connection();
}).then((db) => {
    return db.close();
});

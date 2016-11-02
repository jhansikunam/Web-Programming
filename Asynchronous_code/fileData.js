let fileData = exports = module.exports;

const fs = require('fs');

fileData.getFileAsString = (path) => {
    return new Promise((fulfill,reject) => {
        if(!path) reject("wrong path");
       
        fs.readFile(path,"utf-8",(error,data) => {
            if (error){
                reject(error);
                return;
            }
            fulfill(data);
        });
    });
    
};

fileData.getFileAsJSON = (path) => {
    return new Promise((fulfill,reject) => {
        if(!path){
            reject("wrong path for JSON");
            return;
        }
        fs.readFile(path,"utf-8",(error,data) => {
            if (error) {
                reject(error);
                return;
            }
            try{
                let datajson = JSON.parse(data);
                fulfill(datajson);
            }catch (perror){
                reject(perror);
            }
        });
    });
};

fileData.saveStringToFile = (path, text) => {
    return new Promise((fulfill,reject) => {
        if(!path) reject("wrong path");
        fs.writeFile(path,text,(error,text) => {
            if (error) {
                reject(error);
                return;
            }
            fulfill(true);
        });
    });
};

fileData.saveJSONToFile = (path, obj) => {
    return new Promise((fulfill,reject) => {
        if(!path) reject("wrong path");
        fs.writeFile(path,JSON.stringify(obj,null,4),(error,obj) => {
            if (error) {
                reject(error);
                return;
            }
            fulfill(true);
        })
     })
}



const datafile = require("./fileData");
const metricsCalc = require("./textMetrics");

let datafileresult = datafile.getFileAsString("./chapter1.txt");


datafileresult.then((data) => {
    console.log("File Read was successful");
    let metric = metricsCalc.createMetrics(data);
    console.log("\n");
    console.log("Logging Chapter1 Metrics");
    console.log("\n");
    console.log(metric);
    console.log("--------------------------------------------------------");
}).catch((error) => {
    console.error("There was an error");
    console.error(error);
})


datafileresult = datafile.getFileAsString("./chapter2.txt");

datafileresult.then((data) => {
    console.log("File Read was successful");
    let metric = metricsCalc.createMetrics(data);
    console.log("\n");
    console.log("Logging Chapter2 Metrics");
    console.log("\n");
    console.log(metric)
    console.log("--------------------------------------------------------");
}).catch((error) => {
    console.error("There was an error");
    console.error(error);
});


datafileresult = datafile.getFileAsString("./chapter3.txt");

datafileresult.then((data) => {
    console.log("File Read was successful");
    let metric = metricsCalc.createMetrics(data);
    console.log("\n");
    console.log("Logging Chapter3 Metrics");
    console.log("\n");
    console.log(metric)
}).catch((error) => {
    console.error("There was an error");
    console.error(error);
});

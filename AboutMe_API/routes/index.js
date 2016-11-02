const educationRoutes=require("./infoedu");
const hobbiesRoutes = require("./infohobbies");
const courseRoutes=require("./infocourses")

const constructorMethod = (app) => {
    app.use("/education", educationRoutes);
    app.use("/hobbies", hobbiesRoutes);
    app.use("/classes",courseRoutes)

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;
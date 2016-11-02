const recipeRoutes=require("./recipe");
const commentRoutes = require("./rcomments");
//const courseRoutes=require("./infocourses")

const constructorMethod = (app) => {
    app.use("/recipes", recipeRoutes);
    app.use("/comments", commentRoutes);
    

    app.use("*", (req, res) => {
        res.status(404).json({error: " Not found"});
    });
};

module.exports = constructorMethod;
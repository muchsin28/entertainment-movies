const Router = require("express").Router();
const MovieRoutes = require("./MovieRoutes");
const SeriesRoutes = require("./SeriesRoutes");

Router.get("/", (req, res) => {
	res.send("TES - Home Orchestrator");
});

Router.use("/movies", MovieRoutes);
Router.use("/series", SeriesRoutes);

module.exports = Router;

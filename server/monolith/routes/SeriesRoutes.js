const Router = require("express").Router();
const SeriesController  = require("../controllers/SeriesController");

Router.get("/", (req, res) => {
	res.send("HAloo dari Routes Series");
});
module.exports = Router;

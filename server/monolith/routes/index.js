const Router = require("express").Router();
const MovieRoutes = require("./MovieRoutes");
const SeriesRoutes = require("./SeriesRoutes");

Router.get("/", (req, res) => {
	res.send(`<h1>EntertainMe :</h1>
	<ul style='list-style-type: none'>
	<li><a href='movies' style='text-decoration:none; margin-top: 2px; font-weight:bold; font-size: 30px '>   => Movies</a></li>
	<li><a href='series' style='text-decoration:none; margin-top: 2px; font-weight:bold; font-size: 30px '>   => Series</a></li>
	</ul>
	
	`)

});

Router.use("/movies", MovieRoutes);
Router.use("/series", SeriesRoutes);

module.exports = Router;

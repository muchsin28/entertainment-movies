const Router = require("express").Router();
const MovieRoutes = require("./MovieRoutes");
const SeriesRoutes = require("./SeriesRoutes");
const axios = require('axios');
const { Movies, Series, redis } = require('../config');

Router.get("/entertainme", async (req, res) => {
	try {
		const entertainMeCache = await redis.get('entertainme')
		if (entertainMeCache) {
			res.send(JSON.parse(entertainMeCache))
		} else {
			const getMovies = await axios.get(Movies)
			const getSeries = await axios.get(Series)
			Promise.all([getMovies, getSeries])
				.then((response) => {
					const movies = response[0].data
					const series = response[1].data
					const entertainme = { movies, series }
					redis.set('entertainme', JSON.stringify(entertainme))
					res.status(200).json(entertainme)
				})
		}

	} catch (error) {
		res.status(500).json(error)
	}
});

Router.use("/movies", MovieRoutes);
Router.use("/series", SeriesRoutes);

module.exports = Router;

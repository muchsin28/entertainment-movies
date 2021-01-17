const axios = require('axios')
const { Movies, redis } = require('../config');

class MovieController {
	static async getList(req, res, next) {
		try {
			const entertainMeCache = await redis.get('entertainme')
			if (entertainMeCache) {
				res.send(JSON.parse(entertainMeCache).movies)
			} else {
				const response = await axios.get(Movies)
				const movies = response.data
				await redis.set('movies', JSON.stringify(movies))
				res.status(200).json(movies)
			}
		} catch (error) {
			res.status(400).json(error)
		}
	}
	static async getById(req, res, next) {
		const id = req.params.id
		try {
			const movieCache = await redis.get(`${id}`)
			const moviesCache = await redis.get('movies')
			const entertainMeCache = await redis.get('entertainme')
			movieCache ? res.send(JSON.parse(movieCache))
				: moviesCache ? res.send(JSON.parse(moviesCache).filter(movie => movie._id == id))
					: entertainMeCache ? res.send(JSON.parse(entertainMeCache).movies.filter(movie => movie._id == id))
						: await axios.get(Movies + id)
							.then(response => {
								const movie = response.data
								redis.set(`${id}`, JSON.stringify(movie))
								res.status(200).json(movie)
							})

		} catch (error) {
			res.status(400).json(error)
		}
	}
	static async update(req, res, next) {
		const id = req.params.id
		const popularity = Number(req.body.popularity)
		try {
			const update = await axios.patch(Movies + id, {
				popularity
			})
				.then(result => {
					redis.del(`${id}`)
					redis.del('movies')
					redis.del('entertainme')
					res.status(200).json({ message: "Popularity Updated" })
				})
		} catch (error) {
			res.status(400).json(error)
		}
	}
	static async delete(req, res, next) {
		const id = req.params.id
		try {
			await axios.delete(Movies + id)
				.then(result => {
					redis.del(`${id}`)
					redis.del('movies')
					redis.del('entertainme')
					res.status(200).json({ message: "Item Deleted!" })
				})
		} catch (error) {
			res.status(400).json(error)
		}
	}

}

module.exports = MovieController;

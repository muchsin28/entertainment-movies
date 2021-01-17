const axios = require('axios')
const { Series, redis } = require('../config');

class SeriesController {
	static async getList(req, res, next) {
		try {
			const entertainMeCache = await redis.get('entertainme')
			if (entertainMeCache) {
				res.send(JSON.parse(entertainMeCache).series)
			} else {
				const response = await axios.get(Series)
				const series = response.data
				await redis.set('series', JSON.stringify(series))
				res.status(200).json(series)
			}
		} catch (error) {
			res.status(400).json(error)
		}
	}
	static async getById(req, res, next) {
		const id = req.params.id
		try {
			const seriesCache = await redis.get(`${id}`)
			const SeriesCache = await redis.get('series')
			const entertainMeCache = await redis.get('entertainme')
			seriesCache ? res.send(JSON.parse(seriesCache))
				: SeriesCache ? res.send(JSON.parse(SeriesCache).filter(series => series._id == id))
					: entertainMeCache ? res.send(JSON.parse(entertainMeCache).series.filter(serie => serie._id == id))
						: await axios.get(Series + id)
							.then(response => {
								const series = response.data
								redis.set(`${id}`, JSON.stringify(series))
								res.status(200).json(series)
							})

		} catch (error) {
			res.status(400).json(error)
		}
	}
	static async update(req, res, next) {
		const id = req.params.id
		const popularity = Number(req.body.popularity)
		try {
			const update = await axios.patch(Series + id, {
				popularity
			})
				.then(result => {
					redis.del(`${id}`)
					redis.del('series')
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
			await axios.delete(Series + id)
				.then(result => {
					redis.del(`${id}`)
					redis.del('series')
					redis.del('entertainme')
					res.status(200).json({ message: "Item Deleted!" })
				})
		} catch (error) {
			res.status(400).json(error)
		}
	}
}

module.exports = SeriesController;

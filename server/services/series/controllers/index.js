const Series = require("../models/series");

class SeriesController {
	static getList(req, res, next) {
		Series.find()
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(400).json(err)
				console.log(err)
			})
	}

	static getById(req, res, next) {
		const id = req.params.id
		Series.findOne(id)
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(400).json(err)
				console.log(err)
			})
	}

	static create(req, res, next) {
		Series.insert({
			title: req.body.title,
			overview: req.body.overview,
			poster_path: req.body.poster_path,
			popularity: Number(req.body.popularity),
			tags: req.body.tags.split(",")
		})
			.then(data => {
				res.status(201).json({ message: "Success Add Series" })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}
	static update(req, res, next) {
		const id = req.params.id
		Series.updateOne(id, {
			popularity: Number(req.body.popularity),

		})
			.then(data => {
				res.status(200).json({ message: "Popularity Updated" })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}
	static delete(req, res, next) {
		const id = req.params.id
		Series.deleteOne(id)
			.then(data => {
				res.status(200).json({ message: "Item Deleted!" })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}


}

module.exports = SeriesController;

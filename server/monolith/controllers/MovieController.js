const Movie = require("../models/movie");

class MovieController {
	static getList(req, res, next) {
		Movie.find()
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
		Movie.findOne(id)
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(400).json(err)
				console.log(err)
			})
	}

	static create(req, res, next) {
		console.log(req.body.tags)
		Movie.insert({
			title: req.body.title,
			overview: req.body.overview,
			poster_path: req.body.poster_path,
			popularity: req.body.popularity,
			tags: req.body.tags.split(",")
		})
			.then(data => {
				res.status(201).json({ message: "Success Add Movie" })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}
	static update(req, res, next) {
		const id = req.params.id
		Movie.updateOne(id, {
			popularity: req.body.popularity,

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
		Movie.deleteOne(id)
			.then(data => {
				res.status(200).json({ message: "Item Deleted!" })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}


}

module.exports = MovieController;

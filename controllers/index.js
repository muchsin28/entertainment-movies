const Movie = require("../models/movie");

class MovieController {
	static getList(req, res, next) { //OK
		Movie.find()
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(400).json(err)
				console.log(err)
			})
	}

	static getById(req, res, next) { //OK
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

	static create(req, res, next) { //OK
		Movie.insert({
			title: req.body.title,
			overview: req.body.overview,
			poster_path: req.body.poster_path,
			popularity: Number(req.body.popularity),
			tags: req.body.tags.split(","),

		})
			.then(data => {
				const newMovie = data.ops[0]
				res.status(201).json({ message: "Success Add Movie", newMovie })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}
	static update(req, res, next) { // OK
		const id = req.params.id
		const updatedMovie = {
			title: req.body.title,
			overview: req.body.overview,
			poster_path: req.body.poster_path,
			popularity: Number(req.body.popularity),
			tags: req.body.tags.split(","),

		}
		Movie.updateOne(id, updatedMovie)
			.then(data => {
				res.status(200).json({ message: "Item Updated", updatedMovie })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}
	static delete(req, res, next) { //OK
		const id = req.params.id
		Movie.deleteOne(id)
			.then(data => {
				res.status(200).json({ id, message: "Item Deleted!" })
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}


}

module.exports = MovieController;

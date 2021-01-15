// const Movie = require("../models/movie");
const url= "http://localhost:4001"

class MovieController {
	static async getList(req, res, next) {
		try {
			const movies= await fetch(url+"/movies")
			.then(res => res.json())
			.then(data=>{
					res.status(200).jason(data)
			})
			
		} catch (error) {
			res.status(400).json(error)
		}
	}

	static async getById(req,res,next){
		const id= req.params.id
		try {
			const movie= await fetch(url+"/movies/"+id)
			.then(res => res.json())
			.then(data =>{
				res.status(200).json(data)
			})
			
		} catch (error) {
			res.status(400).json(error)
		}
	}

	static async create(req,res,next){
		const data= {
			title: req.body.title,
			overview: req.body.overview,
			poster_path: req.body.poster_path,
			popularity: req.body.popularity,
			tags:req.body.tags
		}
		try {
			const newMovie= await fetch(url+"/movies",{
				method: 'POST',
				body: data
			})
			.then(res => res.status(201)
			.json({message: 'Success Add Movie'}))
			
		} catch (error) {
			res.status(400).json(error)
		}
	}

	static async update(req,res,next){
		const id= req.params.id
		try {
			const update= await fetch(url+"/movies/"+id,{
				method: 'PATCH',
				body: {
					"_id": id,
					"popularity": req.body.popularity
				}
			})
			.then(res => res.status(200))
			.json({message: 'Popularity Updated'})
			
		} catch (error) {
			res.status(400).json(error)
		}
	}

	static async delete(req,res,next){
		const id= req.params.id
		try {
			const data = await fetch(url+"/movies/"+id,{
				method: 'DELETE'
			})
			.then(res => res.status(200))
			.json({message: "Item Deleted!"})
			
		} catch (error) {
			res.status(400).json(err)
		}
	}

}

module.exports = MovieController;

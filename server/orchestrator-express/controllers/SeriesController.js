// const Series = require("../models/series");
const url= "http://localhost:4002"

class SeriesController {
	static async getList(req, res, next) {
		try {
			const series= await fetch(url+"/series")
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
			const serie= await fetch(url+"/series/"+id)
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
			const newSeries= await fetch(url+"/series",{
				method: 'POST',
				body: data
			})
			.then(res => res.status(201)
			.json({message: 'Success Add serie'}))
			
		} catch (error) {
			res.status(400).json(error)
		}
	}

	static async update(req,res,next){
		const id= req.params.id
		try {
			const update= await fetch(url+"/series/"+id,{
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
			const data = await fetch(url+"/series/"+id,{
				method: 'DELETE'
			})
			.then(res => res.status(200))
			.json({message: "Item Deleted!"})
			
		} catch (error) {
			res.status(400).json(err)
		}
	}

}

module.exports = SeriesController;

const db = require("../config/mongo");
const Movies = db.collection("movies");

class Movie {
	static find() {
		return Movies.find().toArray();
	}

	static findOne(params){
		return Movies.findOne(params);
	}

	static insert(params){
		return Movies.insert(params);
	}

	static updatOne(params1, params2){
		return Movies.updateOne(params1,params2);
	}

	static deleteOne(params){
		return Movies.deleteOne(params)
	}
}

module.exports = Movie;

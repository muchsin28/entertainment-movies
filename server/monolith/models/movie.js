const { db, ObjectId } = require("../config/mongo");
const Movies = db.collection("movies");

class Movie {
	static find() {
		return Movies.find().toArray();
	}

	static findOne(id) {
		const o_id = new ObjectId(id)
		return Movies.findOne({ _id: o_id });
	}

	static insert(data) {
		return Movies.insertOne(data);
	}

	static updateOne(id, data) {
		const o_id = new ObjectId(id)
		return Movies.updateOne({ _id: o_id }, { $set: data });
	}

	static deleteOne(id) {
		const o_id = new ObjectId(id)
		return Movies.deleteOne({ _id: o_id })
	}
}

module.exports = Movie;

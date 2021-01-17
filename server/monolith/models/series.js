const { db, ObjectId } = require("../config/mongo");
const series = db.collection("series");

class Series {
	static find() {
		return series.find().toArray();
	}

	static findOne(id) {
		const o_id = new ObjectId(id)
		return series.findOne({ _id: o_id });
	}

	static insert(data) {
		return series.insertOne(data);
	}

	static updateOne(id, data) {
		const o_id = new ObjectId(id)
		return series.updateOne({ _id: o_id }, { $set: data });
	}

	static deleteOne(id) {
		const o_id = new ObjectId(id)
		return series.deleteOne({ _id: o_id })
	}
}

module.exports = Series;

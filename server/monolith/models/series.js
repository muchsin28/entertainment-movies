const db = require("../config/mongo");
const series = db.collection("series");

class Series {
	static find() {
		return series.find().toArray();
	}

	static findOne(params){
		return series.findOne(params);
	}

	static insert(params){
		return series.insert(params);
	}

	static updatOne(params1, params2){
		return series.updateOne(params1,params2);
	}

	static deleteOne(params){
		return series.deleteOne(params)
	}
}

module.exports = Series;

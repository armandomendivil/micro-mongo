class Model {
	constructor(db, collectionName) {
		this.name = collectionName;
		this.db = db;
	}

	async findOneById(id) {
		let query = {}
		const result = await this.db.collection(this.name).findOne(query);
		if (!result) {
			throw new Error('Db findOneById error');
		}
		return result;
	}

	async find(query, params) {
		const result = await this.db.collection(this.name).find(query).limit(params.limit).toArray();
		if (!result) {
			throw new Error('Db find error');
		} 
		return result;
	}
}
 
module.exports = Model;

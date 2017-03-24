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
}
 
module.exports = Model;

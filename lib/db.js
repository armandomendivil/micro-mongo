'use strict';

const mongoClient = require('mongodb').MongoClient;
const Model = require('../models');

const defaults = {
  host: 'localhost',
  port: 27017,
  db: 'test',
}

class Db {
  constructor (options) {
    options = options || {};
    this.host = options.host || defaults.host;
    this.port = options.port || defaults.port;
    this.db = options.db || defaults.db;
  }

  async connect(callback) {
    this.connected = true;
    let db = await mongoClient.connect(`mongodb://${this.host}:${this.port}/${this.db}`);;
    this.Gym = new Model(db, 'gyms');
    return db;
  }

  async getGym() {
    let db = this;
    let result = await db.Gym.findOneById();
    return result;
  }

  async getGyms(query = {}, params = { limit: 10 }) {
    let db = this;
    let result = await db.Gym.find(query, params);
    return result;
  }
}

module.exports = Db;

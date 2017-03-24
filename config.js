'use strict'

const config = {
  db: {
    host: process.env.host || 'localhost',
    port: process.env.port || 27017,
    db: process.env.db || 'test',
  }
}

module.exports = config;

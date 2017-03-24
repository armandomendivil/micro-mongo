'use strict';

const test = require('ava');
const Db = require('../');
const config = require('../config');

test.beforeEach('setup databasea', async t => {
  const db = new Db(config.db);
  await db.connect();
  t.context.db = db
  t.true(db.connected, 'should be connected')
});

test('get gym by id', async t => {
    let db = t.context.db;
    t.is(typeof db.getGym, 'function', 'getGym is function');
    let result = await db.getGym();
    t.pass();
});

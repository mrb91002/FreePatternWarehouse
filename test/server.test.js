'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../server');
const knex = require('../knex');
const supertest = require('supertest');

suite('users routes', () => {
  before((done) => { // eslint-disable-line no-undef
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  beforeEach((done) => { // eslint-disable-line no-undef
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test('GET /api/users/Ohsewmuch', (done) => {
    supertest(app)
      .get('/api/users/Ohsewmuch')
      .set('Accept', 'application/json, */*')
      .expect(200, {
        aboutMe: 'My name is Christine Benavides and the art of crafting, sewing and creating has always been among my favorite things to do. It is this passion that has brought me here today. It all started when I was a little child and my mother showed me how to sew. She started me off small, fixing a hem, repairing a button and eventualy adjusting a seam. As I continued to practice I was filled with a sense of accomplishment and self empowerment that still drives me today.',
        createdAt: '2016-06-26T14:26:16.000Z',
        deleatedAt: null,
        email: 'mrb91002@gmail.com',
        firstName: 'Christine',
        hashedPassword: '$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK',
        id: 1,
        lastName: 'Benavides',
        phone: '4258821234',
        updatedAt: '2016-06-26T14:26:16.000Z',
        userImageUrl: 'https://market.ionic.io/img/user-default.png',
        userName: 'Ohsewmuch'
      })
      .end(done);
  });
});

/* eslint-disable camelcase */
/* eslint-disable max-len */

'use strict';

exports.seed = function(knex) {
  return knex('patterns').del()
    .then(() => {
      return knex('patterns').insert([{
        id: 1,
        user_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        pattern_name: 'Knit Infinity Scarf'
      }, {
        id: 2,
        user_id: 1,
        created_at: new Date('2015-01-26 14:26:16 UTC'),
        updated_at: new Date('2015-01-26 14:26:16 UTC'),
        pattern_name: 'Crochet Crown'
      }, {
        id: 3,
        user_id: 3,
        created_at: new Date('2016-07-26 14:26:16 UTC'),
        updated_at: new Date('2016-07-26 14:26:16 UTC'),
        pattern_name: 'Turkey Hat'
      }, {
        id: 4,
        user_id: 4,
        created_at: new Date('2014-06-26 14:26:16 UTC'),
        updated_at: new Date('2014-06-26 14:26:16 UTC'),
        pattern_name: 'Grey Cable Beanie'
      }, {
        id: 5,
        user_id: 5,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        pattern_name: 'Bluetastic Purse'
      }, {
        id: 6,
        user_id: 5,
        created_at: new Date('2016-06-27 14:26:16 UTC'),
        updated_at: new Date('2016-06-27 14:26:16 UTC'),
        pattern_name: 'Flower Quilt'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('patterns_id_seq', (SELECT MAX(id) FROM patterns));"
      );
    });
};

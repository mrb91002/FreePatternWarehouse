
exports.seed = function(knex) {
  return knex('patterns').del()
    .then(() => {
      return knex('patterns').insert([{
        id:1,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        pattern_name: 'test1'
      }, {
        id:2,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        pattern_name: 'test2'
      }, {
        id:3,
        user_id:2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        pattern_name: 'test3'
      }, {
        id:4,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        pattern_name: 'test4'
      }, {
        id:5,
        user_id:3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        pattern_name: 'test5'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('patterns_id_seq', (SELECT MAX(id) FROM patterns));"
      );
    });
};

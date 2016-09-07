
exports.seed = function(knex) {
  return knex('user_favorites').del()
    .then(() => {
      return knex('user_favorites').insert([{
        id:1,
        pattern_id:1,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:2,
        pattern_id:1,
        user_id:2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:3,
        pattern_id:2,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:4,
        pattern_id:1,
        user_id:3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:5,
        pattern_id:1,
        user_id:4,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:6,
        pattern_id:1,
        user_id:5,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:7,
        pattern_id:3,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:8,
        pattern_id:5,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:9,
        pattern_id:4,
        user_id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:10,
        pattern_id:5,
        user_id:2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:11,
        pattern_id:5,
        user_id:3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:12,
        pattern_id:2,
        user_id:2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('user_favorites_id_seq', (SELECT MAX(id) FROM user_favorites));"
      );
    });
};

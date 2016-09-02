
exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id:1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: "Christine",
        last_name: "Benavides",
        phone: "4258821234",
        email: "mrb91002@gmail.com",
        user_name: "ohsewmuch",
        hashed_password: "$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK"
      },{
        id:2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: "guest",
        last_name: "user",
        phone: "4238851264",
        email: "guestasdfasdf@gmail.com",
        user_name: "guest1",
        hashed_password: "$2a$12$BVsODe/K.En9Fhj/uOySNeFCN7Rfv7wfUZnBKX24Gj7sEx3B.xkyu"
      }, {
        id:3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: "Good",
        last_name: "Address",
        phone: "4258821234",
        email: "mrb91002@gmail.com",
        user_name: "ohsewmuch",
        hashed_password: "$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK"
      }, {
        id:4,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: "",
        last_name: "",
        phone: "4258821234",
        email: "mrb91002@gmail.com",
        user_name: "ohsewmuch",
        hashed_password: ""
      }, {
        id:5,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: "cLiEnT5",
        last_name: "ClIeNt5",
        phone: "4258821234",
        email: "mrb91002@gmail.com",
        user_name: "ohsewmuch",
        hashed_password: "$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK"
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};

/* eslint-disable camelcase */
/* eslint-disable max-len */

'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'Christine',
        last_name: 'Benavides',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'Ohsewmuch',
        hashed_password: '$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK',
        about_me: 'My name is Christine Benavides and the art of crafting, sewing and creating has always been among my favorite things to do. It is this passion that has brought me here today. It all started when I was a little child and my mother showed me how to sew. She started me off small, fixing a hem, repairing a button and eventualy adjusting a seam. As I continued to practice I was filled with a sense of accomplishment and self empowerment that still drives me today.',
        user_image_url: 'https://img0.etsystatic.com/076/0/8296359/iusa_400x400.34380558_49yv.jpg'
      }, {
        id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'guest',
        last_name: 'user',
        phone: '4238851264',
        email: 'guestasdfasdf@gmail.com',
        user_name: 'Janet1965',
        hashed_password: '$2a$12$BVsODe/K.En9Fhj/uOySNeFCN7Rfv7wfUZnBKX24Gj7sEx3B.xkyu',
        about_me: 'I started crafting years ago and have been crafting ever since.  I started crafting various gifts for friends and then started my vary own business.  If you like my patterns please take a look at my website!',
        user_image_url: 'https://img1.etsystatic.com/115/0/12357225/iusa_400x400.42879389_4qpj.jpg'
      }, {
        id: 3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'Good',
        last_name: 'Address',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'SewManyThing',
        hashed_password: '$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK',
        user_image_url: 'https://img0.etsystatic.com/074/0/15286365/iusa_400x400.33713450_4ees.jpg'
      }, {
        id: 4,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: '',
        last_name: '',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'NotaStitch',
        hashed_password: '',
        user_image_url: 'https://img1.etsystatic.com/109/0/9792282/iusa_400x400.42400417_2dh5.jpg'
      }, {
        id: 5,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'cLiEnT5',
        last_name: 'ClIeNt5',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'CraftyCrafter',
        hashed_password: '$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK',
        user_image_url: 'https://img0.etsystatic.com/074/0/8160067/iusa_400x400.34088986_gkdn.jpg'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};

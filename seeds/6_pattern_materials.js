/* eslint-disable camelcase */
/* eslint-disable max-len */

'use strict';

exports.seed = function(knex) {
  return knex('pattern_materials').del()
    .then(() => {
      return knex('pattern_materials').insert([{
        id: 1,
        pattern_id: 1,
        display_order: 1,
        material: 'knitting needle # 4'
      }, {
        id: 2,
        pattern_id: 1,
        display_order: 2,
        material: 'red wool'
      }, {
        id: 3,
        pattern_id: 1,
        display_order: 3,
        material: 'metal hooks'
      }, {
        id: 4,
        pattern_id: 1,
        display_order: 4,
        material: 'green wool'
      }, {
        id: 5,
        pattern_id: 1,
        display_order: 5,
        material: 'purple dye'
      }, {
        id: 6,
        pattern_id: 2,
        display_order: 1,
        material: 'jeans pocket'
      }, {
        id: 7,
        pattern_id: 3,
        display_order: 1,
        material: 'rainbow yarn'
      }, {
        id: 8,
        pattern_id: 4,
        display_order: 1,
        material: 'green yarn'
      }, {
        id: 9,
        pattern_id: 5,
        display_order: 1,
        material: 'knitting needle #5'
      }, {
        id: 10,
        pattern_id: 6,
        display_order: 1,
        material: 'iron'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('pattern_materials_id_seq', (SELECT MAX(id) FROM pattern_materials));"
      );
    });
};

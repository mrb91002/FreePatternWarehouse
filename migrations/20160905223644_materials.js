'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('materials', (table) => {
    table.increments();
    table.integer('pattern_id')
      .notNullable()
      .references('id')
      .inTable('patterns')
      .onDelete('CASCADE')
      .index();
    table.integer('display_order').unsigned().notNullable();
    table.string('material').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('materials');
};

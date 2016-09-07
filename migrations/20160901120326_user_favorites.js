'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('user_favorites', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('pattern_id')
      .nullable()
      .references('id')
      .inTable('patterns')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_favorites');
};

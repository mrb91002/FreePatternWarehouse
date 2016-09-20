'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('patterns', (table) => {
    table.increments();
    table.timestamps(true, true);
    table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
    table.string('pattern_name', 21).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('patterns');
};

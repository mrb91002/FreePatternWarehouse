'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('pattern_steps', (table) => {
    table.increments();
    table.integer('pattern_id')
      .notNullable()
      .references('id')
      .inTable('patterns')
      .onDelete('CASCADE')
      .index();
    table.integer('display_order').unsigned().notNullable();
    table.text('step_details').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pattern_steps');
};

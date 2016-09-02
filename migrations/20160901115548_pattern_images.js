'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('pattern_images', (table) => {
    table.increments();
    table.integer('pattern_id')
      .notNullable()
      .references('id')
      .inTable('patterns')
      .onDelete('CASCADE')
      .index();
    table.integer('display_order').unsigned().notNullable();
    table.string('image_url').notNullable();
    table.string('alt_text', 50).notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pattern_images');
};

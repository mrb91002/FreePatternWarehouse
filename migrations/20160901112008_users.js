'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.timestamps(true, true);
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone', 20).nullable();
    table.string('email').notNullable();
    table.string('user_name', 255).nullable();
    table.specificType('hashed_password', 'char(60)').nullable();    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

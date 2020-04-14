import * as Knex from "knex";

module.exports.up = async (knex: Knex) => {
    await knex.schema.createTable('notes', function(t) {
        t.increments('id').primary();
        t.string('text').notNullable();
        t.timestamps(true, true);
    });
};

module.exports.down = async (knex: Knex) => {
    await knex.schema.dropTableIfExists('notes');
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("entry_info", (table) => {
        table.increments('entry_id').primary();
        table.dateTime("date_created").notNullable();
        table.string("image_url", 1000).notNullable();
        table.decimal("latitude", null).notNullable();
        table.decimal("longtitude", null).notNullable();
    });
    }

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("entry_info");
};

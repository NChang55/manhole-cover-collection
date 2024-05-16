/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('entry_info', (table) => {
    table.dropColumn('date_created');
    table.renameColumn("longtitude", "longitude");
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("entry_info", (table) => {
        table.dateTime("date_created").notNullable();
        table.renameColumn("longitude", "longtitude");
});
}

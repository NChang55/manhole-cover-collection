/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('entry_info').del()
  await knex('entry_info').truncate()
  await knex('entry_info').insert([
    {
      image_url: "https://firebasestorage.googleapis.com/v0/b/manhole-cover-collection.appspot.com/o/manhole_covers%2FPXL_20240406_085003040.jpg?alt=media&token=25e63c6c-3e35-4fa5-8cd6-f9f5e4124c0a",
      latitude: 35.67369444444444,
      longitude: 139.75719444444445,
    },
    {
      image_url: "https://firebasestorage.googleapis.com/v0/b/manhole-cover-collection.appspot.com/o/manhole_covers%2FPXL_20230924_005833031.jpg?alt=media&token=0513b919-2b04-4783-8b7d-47075d3b6d60",
      latitude: 34.767525,
      longitude: 137.3827777777778,
    }
  ]);
};

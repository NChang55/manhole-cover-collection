require("dotenv").config({ path: "./../.env" });
const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('./knex');

app.use(express.json());
app.use(
    cors({
      "Origin": process.env.FE_PATH
    })
  );

const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send("Let's find some manhole covers!");
  })

  app.get("/allEntries", async (req, res) => {
    let result = await knex("entry_info")
      .select({entry_id: "entry_id", image_url: "image_url", latitude: "latitude", longitude: "longitude"});

    res.status(200).send(result);
  })

  app.post("/newEntry", async (req, res) => {
    const newEntry = req.body;
    console.log(newEntry);
    const post = await knex('entry_info').insert({
      latitude: newEntry.latitude,
      longitude: newEntry.longitude,
      image_url: newEntry.img_url});
    res.status(200).send(post);
  });

  return app;
}

const server = setupServer();
const PORT = parseInt(process.env.PORT) || 8000;

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
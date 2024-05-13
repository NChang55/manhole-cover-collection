const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('./knex');

app.use(express.json());
app.use(cors());

const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send("Let's find some manhole covers!");
  })

  return app;
}

const server = setupServer();
const PORT = parseInt(process.env.PORT) || 8000;

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
const express = require("express");

const server = express();

server.use('/', (req, res) => {
  res.send({greeting: "P1"});
});

server.use('/hello', (req, res) => {
  res.send({greeting: "P2"});
});

server.use('/test', (req, res) => {
  res.send({greeting: "P3"});
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// every route will give the same response which is P1

const express = require("express");

const server = express();

server.use('/user', (req, res) => {
  res.send({greeting: "P1"});
});

server.get('/user', (req, res) => {
  res.send({greeting: "P2"});
});

server.post('/user', (req, res) => {
  res.send({greeting: "P3"});
});

server.delete('/user', (req, res) => {
  res.send({greeting: "P5"});
});

server.listen(3003, () => {
  console.log("Server is running on port 3003");
});

// /user POST, GET, DELETE -> P1

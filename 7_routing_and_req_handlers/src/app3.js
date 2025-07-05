const express = require("express");

const server = express();

server.use('/hello', (req, res) => {
  res.send({greeting: "P1"});
});

server.use('/hello/world', (req, res) => {
  res.send({greeting: "P2"});
});

server.listen(3002, () => {
  console.log("Server is running on port 3000");
});

// /hello -> p1
// /hello/world -> p1

// IF
/*
server.use('/hello/world', (req, res) => {
  res.send({greeting: "P2"});
});

server.use('/hello', (req, res) => {
  res.send({greeting: "P1"});
});

// /hello/world -> p2
// /hello -> p1
*/

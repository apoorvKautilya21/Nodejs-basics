const express = require("express");

const server = express();

server.use('/user', (req, res) => {
  console.log(req.query);
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

server.get('/test/:id/:name', (req, res) => {
  console.log(req.params);
  // /test/123/john
  // { id: '123', name: 'john' }
  res.send({greeting: "P4"});
});

server.listen(3003, () => {
  console.log("Server is running on port 3003");
});

// /user POST, GET, DELETE -> P1

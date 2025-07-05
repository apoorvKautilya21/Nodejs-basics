const express = require("express");

const server = express();

server.use('/hello', (req, res) => {
  res.send({greeting: "P2"});
});

server.use('/test', (req, res) => {
  res.send({greeting: "P3"});
});

server.use('/', (req, res) => {
  res.send({greeting: "P1"});
});

server.listen(3001, () => {
  console.log("Server is running on port 3000");
});

// /test -> p3
// /hello -> p2
// /hello/world -> p2
// /test/hello -> p3
// /hello/test -> p2
// other invalid routes like /random, /abc -> p1
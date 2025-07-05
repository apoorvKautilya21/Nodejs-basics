// added below scripts in package.json
// "start": "node src/app.js",      -> npm run start OR npm start
// "dev": "nodemon src/app.js"      -> npm run dev

const express = require("express");

const server = express();

// for all api routes this will be executed (GET, POST, PUT, DELETE everything)
server.use((req, res) => {
  res.send({greeting: "Hello World 1"});
});

server.listen(3000, () => { console.log('Server is running on port 3000'); });
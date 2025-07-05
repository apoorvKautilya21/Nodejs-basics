const http = require('http');
// OR
// const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/getsecret') {
    res.end('This is a secret');
    return;
  } else if (req.url === '/getpublic') {
    res.end('This is a public message');
    return;
  }

  res.end('Some data not found');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

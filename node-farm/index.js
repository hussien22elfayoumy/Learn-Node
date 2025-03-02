const fs = require('fs');
const http = require('http');

/* 
TODO: Files
const fileIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(fileIn);
const fileOut = `Avocado informatons: ${fileIn}`;
fs.writeFileSync('./txt/out.txt', fileOut);


fs.readFile('./txt/start.txt', 'utf8', (err, data) => {
  console.log(data);
});

*/

// TODO: Server

const server = http.createServer((req, res) => {
  res.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is runnin on port 8000');
});

const fs = require('fs');
const http = require('http');
const url = require('url');

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

const json = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');

const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log(pathName);

  if (pathName === '/' || pathName === '/overview') {
    res.end('Hello from the OverView');
  } else if (pathName === '/product') {
    res.end('Hello from the Product');
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });

    res.end(json);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });

    res.end('<h1>404 Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is runnin on port 8000');
});

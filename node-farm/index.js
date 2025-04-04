import fs from 'fs';
import http from 'http';
import url from 'url';
import { replaceTemp } from './modules/replaceTemp.js';

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

const tempOverview = fs.readFileSync(
  `./templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(`./templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(
  `./templates/template-product.html`,
  'utf-8'
);

const jsonData = fs.readFileSync(`./dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(jsonData);

function filledOverview() {
  const tempCardHtml = dataObj.map((el) => replaceTemp(tempCard, el)).join(',');

  return tempOverview.replace('{%PRODUCT_CARDS%}', tempCardHtml);
}

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // NOTE: Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(filledOverview());
  }

  // NOTE: Product page
  else if (pathname === '/product') {
    const product = dataObj[query.id];

    const productHtml = replaceTemp(tempProduct, product);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(productHtml);
  }

  // NOTE: api route
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(jsonData);
  }

  // NOTE: Not found page
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });

    res.end('<h1>404 Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is runnin on port 8000');
});

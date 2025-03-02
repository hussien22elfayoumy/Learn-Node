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

const tempOverview = fs.readFileSync(
  `./templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(`./templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(
  `./templates/template-product.html`,
  'utf-8'
);

const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(jsonData);

function replaceTemp(temp, el) {
  let output = temp;
  output = output.replaceAll('{%IMAGE%}', el.image);
  output = output.replaceAll('{%PRODUCTNAME%}', el.productName);
  output = output.replaceAll('{%QUANTITY%}', el.quantity);
  output = output.replaceAll('{%PRICE%}', el.price);
  output = output.replaceAll('{%ID%}', el.id);
  output = output.replaceAll('{%DESCRIPTION%}}', el.description);
  if (el.organic) output = output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');

  return output;
}

function filledOverview() {
  const tempCardHtml = dataObj.map((el) => replaceTemp(tempCard, el)).join(',');

  return tempOverview.replace('{%PRODUCT_CARDS%}', tempCardHtml);
}

const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log(pathName);

  // NOTE: Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(filledOverview());
  }

  // NOTE: Product page
  else if (pathName === '/product') {
    res.end('');
  }

  // NOTE: api route
  else if (pathName === '/api') {
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

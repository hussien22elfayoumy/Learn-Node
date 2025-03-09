import { createServer } from 'http';
const PORT = process.env.PORT;

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jean Doe' },
  { id: 3, name: 'Jim Doe' },
];

const server = createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

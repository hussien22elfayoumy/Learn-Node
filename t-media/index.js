import http from 'http';
const PORT = process.env.PORT;
const server = http.createServer((req, res) => {
  res.end('hello again');
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

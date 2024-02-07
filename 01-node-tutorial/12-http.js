const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home page');
  }
  if (req.url === '/about') {
    res.end('About page');
  }
  res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you're looking for.</p>
    <a href="/">Back Home.</a>
  `);
});

server.listen(5000);

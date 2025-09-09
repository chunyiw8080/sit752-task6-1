const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  let result;
  const a = parseFloat(queryObject.a);
  const b = parseFloat(queryObject.b);
  const op = queryObject.op;

  if (!isNaN(a) && !isNaN(b) && op) {
    if (op === 'add') {
      result = a + b;
    } else if (op === 'sub') {
      result = a - b;
    } else {
      result = 'Unsupported operation, use "add" or "sub"';
    }
  } else {
    result = 'Please provide query parameters: ?a=number&b=number&op=add|sub';
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Result: ${result}\n`);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

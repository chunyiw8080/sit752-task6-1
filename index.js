const createServer = require('./server');

const PORT = 3002;
const server = createServer();
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

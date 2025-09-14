const createServer = require('./server');

const PORT = 3001;
const server = createServer();
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

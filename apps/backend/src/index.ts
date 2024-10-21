import { createServer } from './server.js';

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

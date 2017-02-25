import { Server } from 'hapi';
/* eslint-disable no-console */
const server = new Server();
server.connection({
  host: 'localhost',
  port: 8000,
});

server.route();

server.start((err) => {
  if (err) throw err;
  console.log(`server running at ${server.info.uri}`);
});

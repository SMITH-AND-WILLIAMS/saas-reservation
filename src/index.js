const Hapi = require('hapi');
const reservationRoutes = require('./api/routes');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
});

console.log(reservationRoutes.endPoints);
server.route(reservationRoutes.endpoints);

server.start((err) => {
  if (err) throw err;
  console.log(`server running at ${server.info.uri}`);
});

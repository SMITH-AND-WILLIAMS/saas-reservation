const Hapi = require('hapi');
const portalRoutes = require('./routes');

const server = new Hapi.Server();
server.connection({
  port: 8080,
});
server.bind({});
server.register([
  require('inert'),
  require('vision'),
  require('hapi-auth-cookie'),
], (err) => {
  if (err) {
    throw err;
  }
  server.auth.strategy('session', 'cookie', 'try', {
    password: 'password-that-is-at-least-32-chars',
    isSecure: false,
  });
  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    layout: true,
    isCached: false,
    helpersPath: './views/helpers',
    partialsPath: './views/partials',
  });
  server.route(portalRoutes);

  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
    return null;
  });
});
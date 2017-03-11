const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');
const Path = require('path');

const apiRoutes = require(Path.join(__dirname, './routes'));

const db = new Sqlite3.Database(Path.join(process.cwd(),'./dindin.sqlite'));
const validateFunc =  (token, callback)=> {
  db.get('SELECT * FROM users where token = ?', [token], (err, result) => {
    if (err) {
      return callback(err, false);
    }
    const user = result;
    if (typeof user === 'undefined') {
      console.log('broll');
      return callback(null, false);
    }

    return callback(null, true, {
      id: user.id,
      username: user.username,
    });
  });
};
const serverAPI = new Hapi.Server();
serverAPI.connection({
  port: 4000,
});
serverAPI.bind({
  db: db,
});

serverAPI.register([
  require('hapi-auth-bearer-token'),
], (err) => {
  if (err) {
    throw err;
  }
  serverAPI.auth.strategy('api', 'bearer-access-token', {
    validateFunc: validateFunc,
  });

  serverAPI.route(apiRoutes); 

  serverAPI.start((err) => {

    if (err) {
      throw err;
    }
    console.log('serverAPI running at:', serverAPI.info.uri);
    return null;
  });
});
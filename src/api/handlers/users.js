const Bcrypt = require('bcrypt-nodejs');

exports.login = function (request, reply) {
  let sql = 'SELECT * FROM users';
  const params = [];
  sql += ' WHERE username = ?';
  params.push(request.payload.username);
  this.db.get(sql, params, (err, result) => {
    if (err) {
      throw err;
    } 
    const user = result;
    if (!user) {
      return reply('Not authorized').code(401);
    }
    Bcrypt.compare(request.payload.password, user.password, (err, res) => {
      if (err) {
        throw err;
      }
      if (!res) {
        return reply('Incorrect Password').code(401);
      }
      reply(user.token);
    });
  });
};

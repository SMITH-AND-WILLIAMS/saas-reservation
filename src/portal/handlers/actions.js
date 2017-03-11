const Wreck = require('wreck');

exports.login = function (request, reply) {
  const apiUrl = 'http://localhost:4000/api/users/login';
  Wreck.post(apiUrl, {
    payload: JSON.stringify(request.payload),
    json: true,
  }, (err, res, payload) => {
    if (err) {
      throw err;
    }
    if (res.statusCode !== 200) {
      return reply.redirect('http://localhost:8080/login');
    }
    request.cookieAuth.set({
      token: payload.token,
    });
    reply.redirect('http://localhost:8080');
  });
};

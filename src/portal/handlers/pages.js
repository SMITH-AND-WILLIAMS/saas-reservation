const Wreck = require('wreck');

exports.home =  (request, reply) => {
  Wreck.get('http://localhost:4000/api/recipes', { json: true }, (err, res, payload) => {
    if (err) {
      throw err;
    }
    reply.view('index', {
      recipes: payload,
    });
  });
};

exports.viewRecipe = (request, reply) => {

  Wreck.get('http://localhost:4000/api/recipes/'+request.params.id, { json: true }, (err, res, payload) => {
    if (err) {
      throw err;
    }
    reply.view('recipe', {
      recipe: payload,
    });
  });
};

exports.login = (request, reply) => {
  reply.view('login');
};

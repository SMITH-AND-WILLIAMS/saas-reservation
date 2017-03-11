const Recipes = require('./handlers/recipes');
const Users = require('./handlers/users');

module.exports = [{
  method: 'GET',
  path: '/api/recipes',
  handler: Recipes.find,
},
{
  method: 'GET',
  path: '/api/recipes/{id}',
  handler: Recipes.findOne,
},
{
  method: 'POST',
  path: '/api/recipes',
  config: {
    auth: 'api',
  },
  handler: Recipes.create,
},
{
  method: 'POST',
  path: '/api/recipes/{id}/star',
  config: {
    auth: 'api',
  },
  handler: Recipes.quote,
},
{
  path: '/api/users/login',
  method: 'POST',
  handler: Users.login,
},
];

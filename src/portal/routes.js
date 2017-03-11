const Pages = require('./handlers/pages');
const Assets = require('./handlers/assets');
const Actions = require('./handlers/actions');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: Pages.home,
  },{

   method: 'GET',
    path: '/recipes/{id}',
    handler: Pages.viewRecipe
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory,
  },
  {
    method: 'GET',
    path: '/login',
    handler: Pages.login
  },
    {
    method: 'POST',
    path: '/login',
    handler: Actions.login
  },
];
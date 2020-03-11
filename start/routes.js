'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.post('/login', 'AuthController.login');

Route.post('/register', 'AuthController.store');

Route.post('/forgot', 'AuthController.forgot');


Route.group(function () {
  // Noticias
  Route.get('/posts', 'PostController.index');
  Route.post('/posts', 'PostController.store');
  Route.put('/posts/:id', 'PostController.update');
  Route.get('/posts/:id', 'PostController.show');
  Route.delete('/posts', 'PostController.delete');

  // User
  Route.get('/users', 'UserController.index');
  Route.post('/users', 'UserController.store');
  Route.get('/users/:id', 'UserController.show');
  Route.put('/users/:id/edit', 'UserController.update');
  Route.delete('/users/:id', 'UserController.delete');

  // configs
}).middleware('auth').prefix('dashboard');

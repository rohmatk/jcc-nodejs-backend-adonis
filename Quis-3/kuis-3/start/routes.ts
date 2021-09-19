/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.group(() => {
  Route.get('/', 'GenresController.index');
  Route.post('/', 'GenresController.store');
  Route.get('/:id', 'GenresController.show');
  Route.put('/:id', 'GenresController.update');
  Route.delete('/:id', 'GenresController.destroy');
}).prefix('/genres')

Route.group(() => {
  Route.get('/', 'MoviesController.index');
  Route.post('/', 'MoviesController.store');
  Route.get('/:id', 'MoviesController.show');
  Route.put('/:id', 'MoviesController.update');
  Route.delete('/:id', 'MoviesController.destroy');
}).prefix('/movies')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

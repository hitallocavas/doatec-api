'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { message: 'Doatec API 1.0.SNAPSHOT' }
})

// Authentication Routes
Route.post('/api/auth/register', 'AuthController.register');
Route.post('/api/auth/login', 'AuthController.authenticate');

/** The Routes bellow was desired to Create, Read, Update and Delete requests */

// Action Routes
Route.group(() => {
    Route.resource('/api/actions', 'ActionController')
        .apiOnly()
        .except('update')
        .except('findByUserId')
});

// Devices Routes
Route.group(() => {
    Route.resource('/api/devices', 'DeviceController')
        .apiOnly()
        .except('update')
});

/** The Routes bellow was desired to extra requests*/

// Extra Routes
Route.get('/api/actions/user/:id', 'ActionController.findByUserId');
Route.get('/api/devices/user/:id', 'DeviceController.findByUserId');
Route.get('/api/matches/user/:id', 'MatchController.findByUserId');
Route.get('/api/matches/', 'MatchController.index');

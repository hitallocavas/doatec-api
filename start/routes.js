'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { message: 'Doatec API 1.0.SNAPSHOT' }
})

// Authentication Routes
Route.post('/api/auth/register', 'AuthController.register');
Route.post('/api/auth/login', 'AuthController.authenticate');

// Action Routes
Route.group(() => {
    Route.resource('/api/actions', 'ActionController')
        .apiOnly()
        .except('update')
        .except('findByUserId')
});

Route.get('/api/actions/user/:id', 'ActionController.findByUserId');
Route.get('/api/devices/user/:id', 'DeviceController.findByUserId');



// Devices Routes
Route.group(() => {
    Route.resource('/api/devices', 'DeviceController')
        .apiOnly()
        .except('update')
});
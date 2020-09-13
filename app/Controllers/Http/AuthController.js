'use strict'

const User = use('App/Models/User');

class AuthController {

    async register({ request }) {

        const userModel = request.only(['username', 'email', 'password']);

        const createdUser = await User.create(userModel);

        return createdUser;


    }

    async authenticate({ request, auth }) {

        const { email, password } = request.all();

        const token = await auth.attempt(email, password);

        return token;

    }
}

module.exports = AuthController

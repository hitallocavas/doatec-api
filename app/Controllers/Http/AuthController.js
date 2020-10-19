'use strict'

const User = use('App/Models/User');

class AuthController {

    async register({ request }) {

        console.log(request.body)

        const userModel = request.only(['name', 'email', 'password', 'role']);

        const createdUser = await User.create(userModel);

        return createdUser;

    }

    async authenticate({ request, auth }) {

        const { email, password } = request.all();

        const user = await User.query().where('email', '=', email).first();

        const token = await auth.attempt(email, password);

        return user.toJSON();

    }
}

module.exports = AuthController
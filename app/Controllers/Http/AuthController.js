'use strict'

const User = use('App/Models/User');

class AuthController {

    async register({ request }) {

        console.log(request.body)

        const userModel = request.only(['name', 'mail', 'password', 'role']);

        const createdUser = await User.create(userModel);

        return createdUser;

    }

    async authenticate({ request }) {

        const { mail, password } = request.all();

        const user = User.query().where('mail', '=', mail).fetch();

        return user;
    }
}

module.exports = AuthController
'use strict'

const User = use('App/Models/User');

class AuthController {

    async register({ request }) {

        console.log(request.body)

        const userModel = request.only(['name', 'mail', 'password', 'role']);

        const createdUser = await User.create(userModel);

        return createdUser;

    }

    async authenticate({ request, auth }) {

        const { mail, password } = request.all();

        const user = User.query().findBy('mail', mail);

        const token = await auth.attempt(mail, password);

        return {...user, token };

    }
}

module.exports = AuthController
'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UserDetail = use("App/Models/UserDetail");

/**
 * Resourceful controller for interacting with userdetails
 */
class UserDetailController {

    /**
     * Show a list of all userdetails.
     * GET userdetails
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index() {
        const userDetails = UserDetail.query().with('user').fetch();
        return userDetails;
    }


    /**
     * Create/save a new userdetail.
     * POST userdetails
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const data = request.only(['fullname', 'phone']);
        const userDetail = await UserDetail.create({
            user_id: auth.user.id,
            ...data
        });

        return userDetail;
    }

    /**
     * Display a single userdetail.
     * GET userdetails/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        const userDetail = await UserDetail.query().with('user').where('id', params.id).first();
        return userDetail;
    }

    /**
     * Update userdetail details.
     * PUT or PATCH userdetails/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a userdetail with id.
     * DELETE userdetails/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, auth, response }) {
        const car = await Car.findOrFail(params.id);
        if (auth.user.id !== car.user_id) {
            return response.status(401);
        }
        car.delete();
    }
}

module.exports = UserDetailController

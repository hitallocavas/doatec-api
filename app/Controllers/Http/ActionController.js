'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Action = use('App/Models/Action');

/**
 * Resourceful controller for interacting with actions
 */

class ActionController {
    /**
     * Show a list of all actions.
     * GET actions
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index() {
        const actions = Action.query().with('user').fetch();
        return actions;
    }

    /**
     * Create/save a new action.
     * POST actions
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const devices = request.only(['devices']);
        const devicesJson = JSON.stringify(devices);
        const action = await Action.create({
            user_id: auth.user.id,
            devices: devicesJson
        })
        return action;
    }

    /**
     * Display a single action.
     * GET actions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        const action = await Action.query().with('user').where('id', params.id).first();
        return action;
    }

    /**
     * Update action details.
     * PUT or PATCH actions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a action with id.
     * DELETE actions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, auth, response }) {
        const action = await Action.findOrFail(params.id);
        if (auth.user.id !== action.user_id) {
            return response.status(401);
        }
        action.delete();
    }
}

module.exports = ActionController

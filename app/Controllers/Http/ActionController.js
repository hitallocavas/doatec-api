'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Action = use('App/Models/Action');

/**
 * Resourceful controller for interacting with actions
 */

class ActionController {

    async index() {
        const actions = Action.query().with('user').fetch();
        return actions;
    }

    async store({ request }) {
        const data = request.only(['checkComputador', 'checkTablet', 'checkCelular', 'user_id']);
        const action = await Action.create({
            ...data,
            pings: 0
        })
        return action;
    }

    async show({ params }) {
        const action = await Action.query().with('user').where('id', params.id).first();
        return action;
    }

    async update({ params, request, response }) {}

    async destroy({ params, response }) {
        const action = await Action.findOrFail(params.id);
        if (params.id !== action.user_id) {
            return response.status(401);
        }
        action.delete();
    }
}

module.exports = ActionController
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Match extends Model {

    device() {
        return this.belongsTo('App/Models/Device')
    }

    action(){
        return this.belongsTo('App/Models/Action')
    }
}

module.exports = Match

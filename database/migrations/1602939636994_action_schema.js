'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActionSchema extends Schema {
    up() {
        this.create('actions', (table) => {
            table.increments()
            table.boolean('checkComputador').notNullable()
            table.boolean('checkTablet').notNullable()
            table.boolean('checkCelular').notNullable()
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.timestamps()
        })
    }

    down() {
        this.drop('actions')
    }
}

module.exports = ActionSchema
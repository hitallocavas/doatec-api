'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
    up() {
        this.create('matches', (table) => {
            table.increments()
            table.integer('device_id')
                .unsigned()
                .references('id')
                .inTable('devices')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('action_id')
                .unsigned()
                .references('id')
                .inTable('actions')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('action_user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('device_user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.timestamps()
        })
    }

    down() {
        this.drop('matches')
    }
}

module.exports = MatchSchema

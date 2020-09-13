'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrateUserDetailsSchema extends Schema {
    up() {
        this.create('user_details', (table) => {
            table.string('fullname', 100).notNullable()
            table.string('phone', 30).notNullable()
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
                .unique()
            table.increments()
            table.timestamps()
        })
    }

    down() {
        this.drop('user_details')
    }
}

module.exports = MigrateUserDetailsSchema

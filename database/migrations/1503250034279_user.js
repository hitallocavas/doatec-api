'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments()
            table.string('name', 80).notNullable().unique()
            table.string('mail', 254).notNullable().unique()
            table.string('role', 20).notNullable()
            table.string('password', 60).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
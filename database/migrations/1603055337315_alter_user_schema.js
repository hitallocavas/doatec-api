'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
    up() {
        this.table('users', (table) => {
            // alter table
            table.renameColumn('mail', 'email')
        })

        this.table('devices', (table) => {
            // alter table
            table.string('inputTituloEquip')
        })
    }

    down() {
        this.table('users', (table) => {
            // reverse alternations
        })
    }
}

module.exports = AlterUserSchema
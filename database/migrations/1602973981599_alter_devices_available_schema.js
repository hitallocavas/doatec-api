'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterDevicesAvailableSchema extends Schema {
    up() {
        this.alter('devices', (table) => {
            table.boolean('isAvailable')
        })
    }

    down() {
        this.table('devices', (table) => {
            table.dropColumn('isAvailable')
        })
    }
}

module.exports = AlterDevicesAvailableSchema
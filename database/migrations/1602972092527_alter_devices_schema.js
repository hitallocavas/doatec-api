'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterDevicesSchema extends Schema {
    up() {
        this.table('devices', (table) => {
            this.raw('ALTER TABLE devices ADD isAvailable boolean')
        })
    }
}

module.exports = AlterDevicesSchema
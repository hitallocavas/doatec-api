'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterDeviceUserIdSchema extends Schema {
    up() {
        this.table('devices', (table) => {
            // alter table
            table.renameColumn('userId', 'user_id')
        })
    }

    down() {
        this.table('devices', (table) => {
            table.renameColumn('user_id', 'userId')
        })
    }
}

module.exports = AlterDeviceUserIdSchema
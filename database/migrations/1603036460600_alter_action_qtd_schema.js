'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterActionQtdSchema extends Schema {
    up() {
        this.alter('actions', (table) => {
            table.integer('pings')
        })
    }

    down() {
        this.table('actions', (table) => {
            table.dropColumn('pings')
        })
    }
}

module.exports = AlterActionQtdSchema
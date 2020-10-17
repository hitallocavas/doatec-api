'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceSchema extends Schema {
    up() {
        this.create('devices', (table) => {
            table.increments()
            table.string('radioTipoEquip')
            table.string('radioEscala')
            table.string('inputProblEquip')
            table.string('inputReparoEquip')
            table.string('inputDescrEquip')
            table.integer('userId')
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.timestamps()
        })
    }

    down() {
        this.drop('devices')
    }
}

module.exports = DeviceSchema
'use strict'

const Task = use('Task')
const Action = use('App/Models/Action');
const Device = use('App/Models/Device');

class Matching extends Task {
    static get schedule() {
        return '30 * * * * *'
    }

    async handle() {
        // Get Result Sets of entities
        const actionsResultSet = await Action.query().with('user').orderBy('pings', 'asc').fetch();
        const devicesResultSet = await Device.query().with('user').orderBy('id', 'asc').fetch();

        // Extract objects from Result sets
        const actions = actionsResultSet.toJSON();
        const devices = devicesResultSet.toJSON();

        // Extract actions by device requirement
        const computerActions = actions.filter(action => action.checkComputador === true);
        const smartphoneActions = actions.filter(action => action.checkCelular === true);
        const tabletActions = actions.filter(action => action.checkTablet === true);

        // Extract devices by type
        const computerDevices = devices.filter(device => device.radioTipoEquip === 'computador');
        const smartphoneDevices = devices.filter(device => device.radioTipoEquip === 'celular');
        const tabletDevices = devices.filter(device => device.radioTipoEquip === 'tablet');

        // Check devices and actions matching
        if (!this.isEmptyArray(computerActions) && !this.isEmptyArray(computerDevices)) {
            console.log('computerMatching');
            console.log(computerActions);
            console.log(computerDevices);
        }

        if (!this.isEmptyArray(smartphoneActions) && !this.isEmptyArray(smartphoneDevices)) {
            console.log('smartphoneMatching');
        }

        if (!this.isEmptyArray(tabletActions) && !this.isEmptyArray(tabletDevices)) {
            console.log('tabletMatching');
        }

    }


    async processComputerMatching(actionId, devices) {

    }

    async processPhoneMatching(actionId, devices) {

    }

    async processTabletMatching(actionId, devices) {

    }

    isEmptyArray(arr) {
        return !Array.isArray(arr) || !arr.length;
    }
}

module.exports = Matching
'use strict'

const Task = use('Task')
const Action = use('App/Models/Action');
const Device = use('App/Models/Device');
const Mail = use('Mail')

class Matching extends Task {
    static get schedule() {
        return '30 * * * * *'
    }

    async handle() {
        console.log('INICIOU TASK MATCH EM ' + Date.now());

        // Get Result Sets of entities
        const actionsResultSet = await Action.query().with('user').orderBy('pings', 'asc').fetch();
        const devicesResultSet = await Device.query().with('user').orderBy('id', 'asc').fetch();


        // // Extract objects from Result sets
        const actions = actionsResultSet.toJSON();
        const devices = devicesResultSet.toJSON();

        // devices.forEach(async device => {
        //     const deviceResult =  await Device.findOrFail(device.id);;
        //     deviceResult.delete();
        // });
        //
        // actions.forEach(async action => {
        //     const actionResult = await Action.findOrFail(action.id);;
        //     actionResult.delete();
        // });


        // // Extract actions by device requirement
        const computerActions = actions.filter(action => action.checkComputador === true && action.user !== null);
        const smartphoneActions = actions.filter(action => action.checkCelular === true && action.user !== null);
        const tabletActions = actions.filter(action => action.checkTablet === true && action.user_id !== null);

        // Extract devices by type
        const computerDevices = devices.filter(device => device.radioTipoEquip === 'computador' && device.user_id !== null);
        const smartphoneDevices = devices.filter(device => device.radioTipoEquip === 'celular' && device.isAvailable === true && device.user_id !== null);
        const tabletDevices = devices.filter(device => device.radioTipoEquip === 'tablet' && device.isAvailable === true && device.user_id !== null);

        // Check devices and actions matching
        if (!this.isEmptyArray(computerActions) && !this.isEmptyArray(computerDevices)) {
            this.process(computerActions, computerDevices);
        }

        if (!this.isEmptyArray(smartphoneActions) && !this.isEmptyArray(smartphoneDevices)) {
            this.process(smartphoneActions, smartphoneDevices);
        }

        if (!this.isEmptyArray(tabletActions) && !this.isEmptyArray(tabletDevices)) {
            this.process(tabletActions, tabletDevices);
        }

    }

    process(actions, devices) {
        const qtdActions = actions.length;
        const qtdDevices = devices.length;
        let qtdTotal = qtdActions > qtdDevices ? qtdDevices : qtdActions;

        for (let index = 0; index < qtdTotal; index++) {
            const actionMatching = actions[index];
            const deviceMatching = devices[index];

            this.notify(actionMatching, deviceMatching);
        }
    }

    notify(actionMatching, deviceMatching) {
        const actionMessage = this.mountActionMailMessage(deviceMatching);
        const deviceMessage = this.mountDeviceMailMessage(actionMatching);
        this.updateDeviceAvailable(deviceMatching.id);
        this.updateActionPings(actionMatching.id);
        this.sendMail('OLÁ, ENCONTRAMOS UM DOADOAR PARA SUA AÇÃO DO BEM!!! :D <3', actionMessage, actionMatching.user.email);
        this.sendMail('OLÁ, ENCONTRAMOS UMA INSTITUIÇÃO PARA DOAÇÃO DO SEU EQUIPAMENTO!!! :D <3', deviceMessage, deviceMatching.user.email);
    }

    async updateDeviceAvailable(deviceId) {
        const device = await Device.findOrFail(deviceId);
        device.isAvailable = false;
        await device.save();
    }

    async updateActionPings(actionId) {
        const action = await Action.findOrFail(actionId);
        action.pings += 1;
        await action.save();
    }

    mountActionMailMessage(device) {

        const message = '<h1>Encontramos um Doador para Sua Acão!</h1>';
        const p1 = '<p>E-mail do Doador: ' + device.user.email + '</p>';
        const p2 = '<h4>Dados do Equipamento:</h4>'
        const p3 = '<p>Título do Equipamento: ' + device.inputTituloEquip + '</p>';
        const p4 = '<p>Tipo do Equipamento: ' + device.radioTipoEquip + '</p>';
        const p5 = '<p>Nota do equipamento (Numa escala de 0 a 5): ' + device.radioEscala + '</p>';
        const p6 = '<p>Problemas do Equipamento: ' + device.inputProblEquip + '</p>';
        const p7 = '<p>Necessidade de Reparo do Equipamento: ' + device.inputReparoEquip + '</p>';
        const p8 = '<p>Descrição do Equipamento: ' + device.inputDescrEquip + '</p>';
        return message.concat(p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8);

    }

    mountDeviceMailMessage(action) {
        const message = '<h1>Encontramos uma Instituição para Doaçao do Seu Equipamento!</h1>';
        const p1 = '<p>E-mail da Instituição: ' + action.user.email + '</p>';
        return message.concat(p1);
    }

    async sendMail(subject, message, destinatary) {
        await Mail.raw(message, (message) => {
            message.subject(subject)
            message.from('noreply.doatec@gmail.com')
            message.to(destinatary)
        })
    }

    isEmptyArray(arr) {
        return !Array.isArray(arr) || !arr.length;
    }
}

module.exports = Matching
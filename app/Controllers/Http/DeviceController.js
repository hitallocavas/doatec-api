'use strict'

const Device = use('App/Models/Device');

class DeviceController {
    async index() {
        const devices = Device.query().with('user').fetch();
        return devices;
    }

    async store({ request }) {
        const data = request.only(['radioTipoEquip',
            'radioEscala',
            'inputProblEquip',
            'inputReparoEquip',
            'inputDescrEquip',
            'userId'
        ]);
        const device = await Device.create({
            ...data,
            isAvailable: true
        })
        return device;
    }

    async show({ params }) {
        const device = await Device.query().with('user').where('id', params.id).first();
        return device;
    }

    async update({ params, request, response }) {}

    async destroy({ params, auth, response }) {
        const device = await Device.findOrFail(params.id);
        if (params.id !== device.user_id) {
            return response.status(401);
        }
        device.delete();
    }
}

module.exports = DeviceController
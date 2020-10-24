'use strict'

const Match = use('App/Models/Match');


class MatchController {
    async findByUserId({params, response}) {
        const userId = params.id;

        const matches = Match.query()
                             .with('user')
                             .with('action')
                             .with('device')
                             .where('action_user_id', userId)
                             .orWhere('device_user_id', userId)
                             .fetch();

        return matches;
    }
}

module.exports = MatchController;

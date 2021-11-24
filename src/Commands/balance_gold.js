const Command = require('../Structures/Command')

const axios = require("axios").default

axios.defaults.headers.token = 'change-me';
const endpoint = 'https://omlu.aiito.fr';

const users = ['339814984521613312', '290926024924069908', '191583944158740480', '102391380130697216', '257970504323956737', '626110672454811661']

module.exports = new Command({
    name: 'balance_gold',
    description: 'Afficher le solde des Gold de la BDG',

    async run(message, args, client) {

        axios.post(endpoint + '/api/balance_gold')
            .then(function (response) {
                message.reply(response.data.message)
            }).catch(function (error) {
            console.log(error.response.data.message);
        });
    }
})
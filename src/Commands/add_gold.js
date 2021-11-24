const Command = require('../Structures/Command')

const axios = require("axios").default

axios.defaults.headers.token = 'change-me';
const endpoint = 'https://omlu.aiito.fr';

const users = ['339814984521613312', '290926024924069908', '191583944158740480', '102391380130697216', '257970504323956737', '626110672454811661']

module.exports = new Command({
    name: 'add_gold',
    description: 'Ajouter des gold en BDG',

    async run(message, args, client) {

        message.member.roles.add('839334944739819570')
        // if (Number.isInteger(Number(args[1])) && users.includes(message.member.id)) {
        //     axios.post(endpoint + '/api/add-gold', {
        //         quantity: Number(args[1]),
        //         user: message.member.id
        //     }).then(function (response) {
        //         message.reply(response.data.message)
        //     }).catch(function (error) {
        //         console.log(error.response.data.message);
        //     });
        // } else {
        //     if (!Number.isInteger(Number(args[1]))) return message.reply("Ceci n'est pas un chiffre valide merci de rentrer un entier")
        //     if (!users.includes(message.member.id)) return message.reply('Desole vous n\'etes pas autoriser a ajouter des gold en bdg')
        // }
    }
})
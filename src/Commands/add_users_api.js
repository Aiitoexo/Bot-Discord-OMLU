const Command = require('../Structures/Command')

const axios = require("axios").default

axios.defaults.headers.token = 'change-me';
// const endpoint = 'https://omlu.aiito.fr';
const endpoint = 'http://127.0.0.1:8000';

const users = ['339814984521613312', '290926024924069908', '191583944158740480', '102391380130697216', '257970504323956737', '626110672454811661']

module.exports = new Command({
    name: 'add_users_api',
    description: 'add_users_api',

    async run(message, args, client) {

        if (users.includes(message.author.id) || message.author.id === '888067042194882560') {
            let all_users = []

            let roles = ['839595989777514587', '839598015148064808', '839334944739819570']

            for (let i = 0; i < roles.length; i++) {
                message.guild.roles.cache.get(roles[i]).members.forEach(member => {
                    all_users.push([
                        member.nickname,
                        member.id,
                        member._roles,
                    ])
                })
            }

            axios.post(endpoint + '/api/add-user', {
                all_users: all_users
            }).then(function (response) {
                message.reply(response.data.message)
                // console.log(response.data)
            }).catch(function (error) {
                console.log(error.response);
            });
        }
    }
})



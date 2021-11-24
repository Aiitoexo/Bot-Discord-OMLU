const Command = require('../Structures/Command')
const Discord = require('discord.js')

const axios = require("axios").default

axios.defaults.headers.token = 'change-me';
const endpoint = 'https://omlu.aiito.fr';

const users = ['339814984521613312', '290926024924069908', '191583944158740480', '102391380130697216', '257970504323956737', '626110672454811661']

module.exports = new Command({
    name: 'resource_category',
    description: 'Afficher le solde des Gold de la BDG',

    async run(message, args, client, discord) {

        if (args.length === 1) {
            axios.post(endpoint + '/api/show_resource_category')
                .then(function (response) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#7400af')
                        .setTitle('Liste des differentes categorie de resource en BDG')
                        .setDescription('\u200B')
                        .setThumbnail('https://imgur.com/a/KHGr9Wg')
                        .setFields(
                            {
                                name: 'Pour afficher les differents items d\'une categorie taper la commande suivant sans les parenthese:',
                                value: '!resource_category (id)'
                            },
                            {name: 'Exemple: ', value: '!resource_category 2'},
                            {name: '\u200B', value: '\u200B'},
                        )

                    response.data.forEach(element => {

                        let category = element.name
                        category = category.charAt(0).toUpperCase() + category.slice(1);

                        embed.addField(`- ${category}: ${element.id}`, '\u200B', true)
                    })


                    // response.data.forEach(element => {
                    //     let category = element.name
                    //     category = category.charAt(0).toUpperCase() + category.slice(1);
                    //     message.reply(category)
                    // })

                    message.channel.send({embeds: [embed]})
                }).catch(function (error) {
                console.log(error.response.data.message);
            });
        } else if (args.length === 2) {

            axios.post(endpoint + '/api/show_items_category', {
                category: args[1]
            }).then(function (response) {
                console.log(response.data)
                const embed = new Discord.MessageEmbed()
                    .setColor('#7400af')
                    .setTitle('Liste des differentes items de la categorie ??? sa arrive xD')
                    .setDescription('\u200B')
                    .setThumbnail('https://imgur.com/a/KHGr9Wg')

                response.data.forEach(element => {

                    let item = element.name
                    item = item.charAt(0).toUpperCase() + item.slice(1);

                    embed.addField(`- ${item}`, `Quantiter en BDG : ${element.quantity}`, false)
                })

                message.channel.send({embeds: [embed]})

            }).catch(function (error) {
                console.log(error.response.data.message);
            });
        } else {
            message.reply('Desole cette commande n\'est pas valide')
        }
    }
})
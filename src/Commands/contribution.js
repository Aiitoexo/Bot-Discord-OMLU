const Command = require('../Structures/Command')
const Discord = require("discord.js");

const axios = require("axios").default

axios.defaults.headers.token = 'change-me';
// const endpoint = 'https://omlu.aiito.fr';
const endpoint = 'http://127.0.0.1:8000';

const users = ['339814984521613312', '290926024924069908', '191583944158740480', '102391380130697216', '257970504323956737', '626110672454811661',]

const all_channels = [
    ['840270639402188870', '840021370007977984'],
    ['883183930797351003', '883176941371416576'],
    ['883184282863013919', '883178348501696553'],
    ['883184336348799036', '883179560919773225'],
    ['883184434872983562', '883178778036142080'],
    ['883184490736939099', '883188041026535434'],
    ['883184574388142081', '883179034652078081'],
    ['883184631212568596', '883179143070642207'],
    ['883184688980697098', '883179181524000829'],
    ['883184734858014730', '883179219939643443'],
    ['883184783511912498', '883179258195898369'],
    ['883184852269158450', '883179284959756328'],
    ['883184926940364870', '883179323090145371'],
    ['883184975153881138', '883179353423364208'],
    ['883185027943387176', '883179378303967232'],
    ['883185074118463488', '883179407362105405'],
    ['883185120692019270', '883179438861352980'],
    ['883185187268223007', '883179478027759636'],
    ['883185235137818654', '883179519861735475'],
    ['883185281870753833', '883178753201692704'],
    ['883185336971296779', '883179591483686922'],
]

module.exports = new Command({
    name: 'contribution',
    description: 'spam tous les membre pour leur contribution',

    async run(message, args, client) {

        axios.post(endpoint + '/api/contribution')
            .then(function (response) {
                let data = response.data

                data.forEach(user => {
                    all_channels.forEach(squad => {
                        if (user.id_discord_role === squad[0]) {
                            let channel_squad = client.channels.cache.get(squad[1])
                            // console.log(user)
                            if (user.quantity_resource_request !== undefined) {
                                console.log(user.quantity_resource_request)
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#7400af')
                                    .setAuthor(user.pseudo.trim())
                                    .setTitle(`Contribution du ${user.start_on} au ${user.finished_it}`)
                                    .setDescription('\u200B')
                                    .setThumbnail(user.img)
                                    .setFields(
                                        {
                                            name: `Contribution demandée ${user.quantity_resource_request} ${user.name}`,
                                            value: `${user.quantity_resource_received} / ${user.quantity_resource_request}`
                                        },
                                    )

                                channel_squad.send({embeds: [embed]})

                            } else if (user.quantity_gold_request !== undefined) {
                                console.log(user)
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#7400af')
                                    .setAuthor(user.pseudo.trim())
                                    .setTitle(`Contribution du ${user.start_on} au ${user.finished_it}`)
                                    .setDescription('\u200B')
                                    .setFields(
                                        {
                                            name: `Contribution demandée ${user.quantity_gold_request} Gold`,
                                            value: `${user.quantity_gold_received} / ${user.quantity_gold_request}`
                                        },
                                    )

                                channel_squad.send({embeds: [embed]})

                                // channel_squad.send(`Test : Salut la contribution demander pour ${user.pseudo.trim()} est de ${user.quantity_gold_request} Gold`)
                            }
                        }
                    })
                })
            }).catch(function (error) {
            console.log(error.response);
        });
    }
})
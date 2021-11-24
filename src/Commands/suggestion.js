const Command = require('../Structures/Command')
const Discord = require("discord.js");

module.exports = new Command({
    name: 'suggestion',
    description: 'suggestion',

    async run(message, args, client) {

        if (message.channel.id === '884207657706205204') {
            let argument = args.splice(1)
            const question = argument.join(' ')

            const embed = new Discord.MessageEmbed()
                .setColor('#7400af')
                .setAuthor(`Suggestion | Merci de voter pour ou contre`)
                .setTitle('Par: ' + message.author.username)
                .setDescription('\u200B')
                .setThumbnail('https://i.ibb.co/D8tRvpT/logo-png.png')
                .setFields(
                    {
                        name: `${question}`,
                        value: '\u200B'
                    },
                )


            let test = message.channel.send({embeds: [embed]}).then(messageEmbed => {
                messageEmbed.react('<:thumbsup:>')
                messageEmbed.react('✔')
            })

        }
    }
})
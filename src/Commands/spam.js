const Command = require('../Structures/Command')

const users = ['339814984521613312', '290926024924069908', '191583944158740480', '102391380130697216', '257970504323956737', '626110672454811661',]

const all_channels = [
    '840021370007977984',
    '883176941371416576',
    '883178348501696553',
    '883179560919773225',
    '883178778036142080',
    '883188041026535434',
    '883179034652078081',
    '883179143070642207',
    '883179181524000829',
    '883179219939643443',
    '883179258195898369',
    '883179284959756328',
    '883179323090145371',
    '883179353423364208',
    '883179378303967232',
    '883179407362105405',
    '883179438861352980',
    '883179478027759636',
    '883179519861735475',
    '883178753201692704',
    '883179591483686922',
]

module.exports = new Command({
    name: 'spam',
    description: 'spam tous les channels esquadrons',

    async run(message, args, client) {
        if (users.includes(message.author.id) || message.author.id === '891910029819641866') {
            if (args[1] === 'delete') {
                // client.channels.cache.get('839334072081842206').messages.fetch({limit: 1}).then((message) => {
                //     client.channels.cache.get('839334072081842206').bulkDelete(message)
                // })

                for (let i = 0; i < all_channels.length; i++) {
                    client.channels.cache.get(all_channels[i]).messages.fetch({
                        limit: 10 // Change `100` to however many messages you want to fetch
                    }).then((messages) => {
                        const botMessages = [];
                        messages.filter(m => m.author.id === '891910029819641866').forEach(msg => botMessages.push(msg))
                        client.channels.cache.get(all_channels[i]).bulkDelete(botMessages);
                    })
                }
            } else if (args[1] === 'grp') {
                let temp = args.slice(3)
                const order = temp.join(' ')

                client.channels.cache.get(all_channels[args[2] - 1]).send(`${order}`)
            } else if (args[1] === 'all') {
                let temp = args.slice(2)
                const order = temp.join(' ')

                for (let i = 0; i < all_channels.length; i++) {
                    client.channels.cache.get(all_channels[i]).send(`${order}`)
                }
            }
            // else if (args[1] === 'grp' && args[3] === '-') {
            //     let temp = args.slice(3)
            //     const order = temp.join(' ')
            //
            //     client.channels.cache.get(all_channels[args[2] - 1]).send(`${order}`)
            // }
        } else {
            message.reply("Desole tu n'as pas les droits pour realiser cette commande !")
        }
    }
})
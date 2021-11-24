const {ignore} = require("nodemon/lib/rules");
require('dotenv').config()

const axios = require("axios").default

axios.defaults.headers.token = 'change-me';
// const endpoint = 'https://omlu.aiito.fr';
const endpoint = 'http://127.0.0.1:8000';

const Client = require('./src/Structures/Client')
const Command = require('./src/Structures/Command')
const config = require("./src/Data/config.json")
const client = new Client()
const fs = require('fs')

fs.readdirSync('./src/Commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {

        /**
         * @type {Command}
         */
        const command = require(`./src/Commands/${file}`)
        client.commands.set(command.name, command)
    })

client.on("guildMemberAdd", (member) => {
    member.send(`Hello ${member.user.username} ! J’ai vu que tu venais d’arriver sur notre discord. Si tu es intéressé par le fait de nous rejoindre n’hésite pas à poster ta candidature dans le chan Recrutement. Et je (Aiito) pourrais t’expliquer notre projet et répondre plus en détail à toutes les questions que tu peux te poser directement en vocal, dans un Vocal Libre ! 

PS : Pour ceux qui n’ont pas vu nos posts de recrutement nous recherchons des joueurs avec une bonne connaissance du jeu et un esprit de TryHard et Compétitif. Si tu nous rejoins tu auras :
- L’assurance de toujours trouver quelqu'un pour parcourir l’île avec toi.
- Des équipes de 5 joueurs fixes, à la fois familiales et compétitives, tout ça dans la bonne humeur.
- La possibilité de décupler tes compétences sans avoir à passer des heures à faire des recherches grâce au travail de nos stratèges.
- Un accès à une banque de compagnie toujours pleine de tous les types de ressources.
- L’assurance, grâce à notre grand conseil, de participer à chaque décision qui concerne l’avenir ou le quotidien de la compagnie.
- La garantie d’intégrer une compagnie, d'un niveau de jeu compétitif, ou jamais tu ne considéreras un adversaire comme imbattable, et ce dans n’importe quel domaine.
- Des concours hebdomadaires pour perfectionner la coordination de ton équipe et gagner des prix. 
Alors, si tu es une personne détendue, positive, privilégiant l'entraide et la bonne humeur, et si tu souhaites mettre toutes les chances de ton côté pour faire de ta conquête d’Aeternum une réussite : bienvenue à bord !`)

    console.log(`onGuildMemberAdd - ${member.user.username}`);
})

client.on("guildMemberRemove", (member) => {
    const LogChannel = client.channels.cache.get("887284808886136922")

    LogChannel.send(`**${member.user.username}** a quitté le serveur ID: **${member.user.id}**`)

    console.log(`onGuildMemberRemove - ${member.user.username}`);
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(config.prefix)) return

    const args = message.content.substring(config.prefix.length).split(/ +/);
    const command = client.commands.find(cmd => cmd.name === args[0])

    if (!command) return message.reply("Ce n'est pas une commande valide");

    command.run(message, args, client)

    console.log(`onMessageCreate - ${message.content}`);
})

client.login(process.env.DISCORD_TOKEN)

console.log('Bot OMLU started');

console.log('Waiting for commands...');

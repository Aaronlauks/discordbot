const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let killGifs = ['https://media.tenor.com/images/6bdd5b4f5da260636a435d830bccbf25/tenor.gif',
    'https://media1.tenor.com/images/ea7294f9919cd75b9a5217b818a082e3/tenor.gif?itemid=15363712'
];
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} blushes (⁄ʘ⁄ ⁄ ω⁄ ⁄ ʘ⁄)♡`, message.author.avatarURL)
    .setImage(killGifs[Math.floor(Math.random() * killGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "blush",
    description: "idk just go blush",
    category: "Emotes",
    usage: "a blush",
    accessableby: "Everyone",
    aliases: ["flush"]
  }
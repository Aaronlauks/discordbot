const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let killGifs = ['https://media.tenor.com/images/29ae2cde7817e1c56a982d7dc7416769/tenor.gif',
    'https://media1.tenor.com/images/a5025e3834ab1688e5340403dff3d7af/tenor.gif?itemid=5219320',
    'https://media1.tenor.com/images/a10bf59d7fbd5d3649ee82265c8c2463/tenor.gif?itemid=3532534'
];
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} is sad! ;-;`, message.author.avatarURL)
    .setImage(killGifs[Math.floor(Math.random() * killGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "cry",
    description: "Pusheen can cure depression :D",
    category: "Emotes",
    usage: "a cry",
    accessableby: "Everyone",
    aliases: ["frown", "sad", "depress", "depression", "depressed"]
  }
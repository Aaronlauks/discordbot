const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let killGifs = ['https://i.pinimg.com/originals/ce/58/fa/ce58fa3019da74ed2ccdbbe2d0869a5e.gif',
    'https://25.media.tumblr.com/tumblr_mc79y7mphH1rj1hsio1_500.gif',
    'https://i.pinimg.com/originals/41/5e/26/415e26d629349af925ce957908a6c272.gif',
    'https://media1.tenor.com/images/59ce18730f8fc808af7d63bf037ae357/tenor.gif?itemid=5947159',
    'https://i.gifer.com/2v6v.gif',
    'https://media.tenor.com/images/cfbcfa45f3137e2990934d9d761967f8/tenor.gif',
    'https://media.giphy.com/media/WRcbGrpJ5ZGjGAssa5/giphy.gif',
    'https://media.giphy.com/media/l5Ixyi91ENW1N2MyAc/giphy.gif',
    'https://media1.tenor.com/images/81c53026adeb59a22823f4c54f5bb115/tenor.gif?itemid=5257947',
    'https://giffiles.alphacoders.com/208/208549.gif',
    'https://media1.tenor.com/images/98262a2f088b6f7c8691bba05962ca9f/tenor.gif?itemid=14393163',
    'https://media.tenor.com/images/efe06495525c19bb110fc16d6c3c0388/tenor.gif'
];
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} fell asleep Zzzzz...`, message.author.avatarURL)
    .setImage(killGifs[Math.floor(Math.random() * killGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "sleep",
    description: "GO SLEEP",
    category: "Emotes",
    usage: "a sleep",
    accessableby: "Everyone",
    aliases: ["nap", "slep", "rest"]
  }
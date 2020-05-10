const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let cuddleGifs = ['https://media1.tenor.com/images/3fc9d04c3aab73f5ce1ffdca2b87d894/tenor.gif?itemid=11573062',
    'https://media1.tenor.com/images/6465dd27ed1ef508dbd75f531609f070/tenor.gif?itemid=12655740',
    'https://i.imgur.com/nSWULSF.gif'
];
    let person = message.mentions.users.first();
    if(!person) return message.channel.send(`<:xcross:690880230562201610> mention someone to pat x3`);
    if(person.tag == message.author.tag) return message.channel.send(`<:xcross:690880230562201610> that's kinda weird... but it's okay!!!`);
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} pats ${person.username} o3o`, message.author.avatarURL)
    .setImage(cuddleGifs[Math.floor(Math.random() * cuddleGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "pat",
    description: "pat someone as cute as pusheen",
    category: "Emotes",
    usage: "a pat <mention>",
    accessableby: "Everyone",
    aliases: ["snuggle", "hug", "nuzzle", "huddle", "embrace"]
  }
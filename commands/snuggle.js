const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let cuddleGifs = ['https://i.gifer.com/3pUc.gif',
    'https://thumbs.gfycat.com/DemandingJoyfulIberianemeraldlizard-small.gif',
    'https://media1.giphy.com/media/PMfqAVSoWeZ3y/giphy.gif',
    'https://media1.tenor.com/images/c1e542cabd0b11cf0c3d645dbb621390/tenor.gif?itemid=14765699',
    'https://media1.tenor.com/images/0cc6caf01c341d8cd8a515724d9e5268/tenor.gif?itemid=12646028',
    'https://i.gifer.com/5yXt.gif',
    'https://media1.tenor.com/images/b48af134f3ac016d18ad91b269ee0149/tenor.gif?itemid=5064184',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRkr6iQ1edF2jKUgEsn9TwRqWnEjQloonyNNYogAWMDi7TBtoLY&usqp=CAU',
    'https://media.tenor.com/images/5b75ed9a66e2d6fe15f89719c47e5a67/tenor.gif'
];
    let person = message.mentions.users.first();
    if(!person) return message.channel.send(`<:xcross:690880230562201610> mention someone or I will cuddle you!!!`);
    if(person.tag == message.author.tag) return message.channel.send(`<:xcross:690880230562201610> Don't worry, I will hug you`);
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} cuddles ${person.username} x3`, message.author.avatarURL)
    .setImage(cuddleGifs[Math.floor(Math.random() * cuddleGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "cuddle",
    description: "Cuddle someone you love",
    category: "Emotes",
    usage: "a cuddle <mention>",
    accessableby: "Everyone",
    aliases: ["snuggle", "hug", "nuzzle", "huddle", "embrace"]
  }
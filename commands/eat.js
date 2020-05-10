const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let killGifs = ['https://media3.giphy.com/media/Zy5ymnOUhtRkI/source.gif',
    'https://media.tenor.com/images/fb4e1c7a19f1b44470a112d1103316af/tenor.gif',
    'https://media.tenor.com/images/a64f657cde38d1644aa6fe92f105c7e2/tenor.gif',
    'https://i.pinimg.com/originals/c9/e0/70/c9e070c32cce9c388475dfb50fc39ec6.gif',
    'https://media1.giphy.com/media/1wpPbeW1PvF19PSrCr/source.gif',
    'https://i.pinimg.com/originals/9c/fe/e3/9cfee30dc0db9732dc1dc914d98915ac.gif',
    'https://media0.giphy.com/media/fdLUNj1L6G02T4Voho/source.gif',
    'https://aht.seriouseats.com/images/2011/08/20110824-pusheen-burger.gif',
    'https://media1.tenor.com/images/12d7cb328ea06f3b0997f5b2313810f3/tenor.gif?itemid=9402150',
    'https://data.whicdn.com/images/169170028/original.gif',
    'https://rs1187.pbsrc.com/albums/z393/KristineChavezRodriguez/eatturkey.gif~c200',
    'https://i.pinimg.com/originals/11/5e/77/115e779d8cb93a09ba0cee619c95e7ab.gif',
    'https://media.giphy.com/media/yDheBbdYrObTy/giphy.gif',
    'https://i.stack.imgur.com/k2Ifr.gif',
    'https://i.pinimg.com/originals/f2/ed/eb/f2edeb1237486c3119bf316b922fc0dc.gif'
];
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} eats a snack Yum!`, message.author.avatarURL)
    .setImage(killGifs[Math.floor(Math.random() * killGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "eat",
    description: "eat a snack (u become fat)",
    category: "Emotes",
    usage: "a eat",
    accessableby: "Everyone",
    aliases: ["food", "consume", "snack"]
  }
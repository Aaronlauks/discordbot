const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let killGifs = ['https://media1.tenor.com/images/166e83f1dc3361f4ccb377b38838b407/tenor.gif?itemid=5243498',
    'https://thumbs.gfycat.com/FlusteredAcademicHectorsdolphin-size_restricted.gif',
    'https://media1.tenor.com/images/3d6300606b734fcc79d88b6f319398c3/tenor.gif?itemid=5087598',
    'https://i.pinimg.com/originals/fe/f9/26/fef9260fc7027122e8d2239f48fd3499.gif',
    'https://i.gifer.com/8Sah.gif',
    'https://i.pinimg.com/originals/27/16/46/2716464aca925558f1ed940382bf46a8.gif',
    'https://media.tenor.com/images/f55e997da5cbab73ec6f585721186c64/tenor.gif',
    'https://media.giphy.com/media/2fWU5710dRMHjlIo01/giphy.gif',
    'https://i.pinimg.com/originals/36/ca/65/36ca651a0e7f5b6d83c5f6aa8b2bdf4d.gif'
];
    let person = message.mentions.users.first();
    if(!person) return message.channel.send(`<:xcross:690880230562201610> mention someone or u die`);
    if(person.tag == message.author.tag) return message.channel.send(`<:xcross:690880230562201610> nuuu self harm ;-;`);
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} kills ${person.username} Dx`, message.author.avatarURL)
    .setImage(killGifs[Math.floor(Math.random() * killGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "kill",
    description: "kill someone you mention DD:",
    category: "Emotes",
    usage: "a kill <mention>",
    accessableby: "Everyone",
    aliases: ["attack", "fight"]
  }
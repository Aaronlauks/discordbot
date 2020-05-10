const {RichEmbed} = require("discord.js")
exports.run = async function (bot, message, args) {
    let killGifs = ['https://media.tenor.com/images/223076f6928beb57796a72e6472a3004/tenor.gif',
    'https://media.tenor.com/images/b87cc8ccd766d10d6dc6c1208361ce75/tenor.gif',
    'https://media1.tenor.com/images/83249c20c2e52902008e2ce681cf9953/tenor.gif?itemid=5064179',
    'https://i.pinimg.com/originals/27/16/46/2716464aca925558f1ed940382bf46a8.gif',
    'https://media1.tenor.com/images/a0b54274a4fe250d78cf8537a7d2a9a7/tenor.gif?itemid=7589345',
    'https://media2.giphy.com/media/RKNYxAq5w5O8ASk9F8/source.gif',
    'https://thumbs.gfycat.com/BiodegradableConcernedCollie-size_restricted.gif'
];
    let person = message.mentions.users.first();
    if(!person) return message.channel.send(`<:xcross:690880230562201610> pls trigger someone and not me`);
    if(person.tag == message.author.tag) return message.channel.send(`<:xcross:690880230562201610> I have no words...`);
    const embed = new RichEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setAuthor(`${message.author.username} triggers ${person.username} &_&`, message.author.avatarURL)
    .setImage(killGifs[Math.floor(Math.random() * killGifs.length)]);
    message.channel.send(embed);
}
module.exports.config = {
    name: "trigger",
    description: "trigger someone you mention D:<",
    category: "Emotes",
    usage: "a trigger <mention>",
    accessableby: "Everyone",
    aliases: ["annoy", "provoke"]
  }
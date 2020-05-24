const Discord = require("discord.js");
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

exports.run = (bot, message, args) => {
    if (args.length < 1) return message.channel.send("<:xcross:658850997757804555> Please provide some text to Mock")

    let mockEmbed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setDescription(args.map(randomizeCase))
    .setThumbnail("https://cdn.discordapp.com/attachments/424889733043191810/425242569325150208/mock.jpg")

    message.channel.send(mockEmbed)

    message.delete();

}


module.exports.config = {
  name: "mock",
  description: "Does the spongebob chicken mock and makes your words LiKe tHiS wHicH iS gAy",
  category: "Fun",
  usage: "a mock <message>",
  accessableby: "Everyone",
  aliases: ["sponge", "spongebob", "chicken"]
}

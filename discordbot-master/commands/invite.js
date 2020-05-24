const { RichEmbed } = require("discord.js");

exports.run = async (bot, message, args, ops) => {
  const embed = new RichEmbed()
  .setTitle(`<a:araragiPlatDance:690217561740148761> Invite me!`)
  .setURL(`https://discordapp.com/oauth2/authorize?client_id=574910890399236104&scope=bot&permissions=8`)
  .setAuthor(
        `Click the link below for the bot invite:`,
        bot.user.displayAvatarURL
  )
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
  message.channel.send(embed)
}

module.exports.config = {
  name: "invite",
  description: "Gives you the invite link of this bot",
  category: "Miscellaneous",
  usage: `a invite`,
  accessableby: "Everyone",
  aliases: ["link", "invites", "botinvite", "invitation", "invit"]
}

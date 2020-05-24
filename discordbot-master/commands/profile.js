const discord = require("discord.js")

exports.run = (bot, message, args) => {
  const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new discord.RichEmbed()
        .setColor('#00ff15')
        .setAuthor(user.username + " (" + user.presence.status + ")")
        .setImage(user.avatarURL);
  message.channel.send(avatarEmbed);
}

module.exports.config = {
  name: "avatar",
  description: "Displays the avatar of you or the user mentioned in the command",
  category: "Miscellaneous",
  usage: "a avatar",
  accessableby: "Everyone",
  aliases: ["avatar", "user", "pfp"]
}

const discord = require("discord.js");
const bot = new discord.Client({disableEveryone: true});

exports.run = (bot, message, args) => {
  if(!args[0]) return message.channel.send("Please supply a username")
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('you do not have permissions to use this command!');
  var mem = message.mentions.members.first();
    if (mem === null) { return; }
    const embed4 = new discord.RichEmbed();
    embed4.setTitle("**__You have heard too much__**");
    embed4.setDescription(
      "🔇 " + mem.displayName + " has been muted by " + message.author.username
    );
    embed4.setColor("#ff0000");
    if (message.guild.roles.find("name", "Muted")) {
      mem.addRole(message.guild.roles.find("name", "Muted"));
      mem.removeRoles(mem.roles).then(() => {
        message.channel.send(embed4);
        })
        .catch(e => {
          message.channel.send("Somehow, this user can't be muted :C");
        });
    }
}

module.exports.config = {
  name: "mute",
  description: "Mutes a user that is specified in the command",
  category: "Moderation",
  usage: "a mute <user>",
  accessableby: "Administrators and Moderators",
  aliases: ["timeout", "silent"]
}

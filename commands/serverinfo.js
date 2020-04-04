const discord = require("discord.js");
const bot = new discord.Client({ disableEveryone: true });

exports.run = (bot, message, args) => {
  message.delete();
  let icon = message.guild.iconURL;
  const embed7 = new discord.RichEmbed();
  embed7.setAuthor(
    "Server Info",
    "https://cdn.discordapp.com/attachments/632854158789312514/639037787768619010/discord_bot_pfp.jpg"
  );
  embed7.setTitle("**Server Name:**");
  embed7.setThumbnail(icon);
  embed7.setColor("#00ff15 ");
  embed7.setDescription(message.guild.name);
  embed7.addField("**Server Created On**", message.guild.createdAt);
  embed7.addField("**Bot joined On**", message.guild.joinedAt);
  embed7.addField("**Total Members**", message.guild.memberCount);
  message.channel.send(embed7);
};
module.exports.config = {
  name: "serverinfo",
  description: "Gives information about the server",
  category: "Miscellaneous",
  usage: "a serverinfo",
  accessableby: "Everyone",
  aliases: ["server", "stats", "serverstats"]
}

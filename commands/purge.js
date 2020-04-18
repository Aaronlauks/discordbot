const discord = require("discord.js");
const bot = new discord.Client({disableEveryone: true});

exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send("<:xcross:658850997757804555> Please supply a number")
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('<:xcross:658850997757804555> you do not have permissions to use this command!');
  if (isNaN(args[0])) return msg.reply('<:xcross:658850997757804555> The amount parameter isn`t a number!');

  if (args[0] > 100) return msg.reply('<:xcross:658850997757804555> You can`t delete more than 100 messages at once!');
  if (args[0] < 1) return msg.reply('<:xcross:658850997757804555> You have to delete at least 1 message!');
  let deletedMessages = args[0];
  message.delete();
  let fetched = await message.channel.fetchMessages({limit: args[0]});
  fetched.forEach(m => {
    if (m.author.id == bot.user.id) {
      m.delete().catch(console.error);
      deletedMessages -= 1;
  }
  });
  fetched = await message.channel.fetchMessages({limit: deletedMessages});
    message.channel.bulkDelete(fetched).then(f => {
      message.channel.send(`🗑️ Purged ${args[0]} messages!`).then(m => m.delete(3000));
    });
}

module.exports.config = {
  name: "purge",
  description: "Deletes the number of messages specified in the above command",
  category: "Moderation",
  usage: "a purge <number of messages>",
  accessableby: "Administrators and Moderators",
  aliases: ["prune", "delete", "clear"]
}

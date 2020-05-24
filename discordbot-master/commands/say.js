const discord = require("discord.js");
const bot = new discord.Client({disableEveryone: true});

exports.run = (bot, message, args) => {
  if (message.author.id !== '488249600264896523') return message.reply('Only Aaronlauks can use this command!')
   var mc = args.join(" ");
    if (mc === null) { return; }
    message.delete();
    message.channel.send(mc); 
}
module.exports.config = {
  name: "say",
  description: "Mimics what you say!",
  usage: "a say <message>",
  category: "Bot Owner Only",
  accessableby: "Bot owner (Aaronlauks)",
  aliases: ["mimic", "send"]
}

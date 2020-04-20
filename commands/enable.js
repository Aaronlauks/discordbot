const disable = require("../models/disable.js");
const discord = require('discord.js') 

exports.run = async (bot, message, args, ops) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply('<:xcross:690880230562201610> you do not have the permission \`MANAGE CHANNELS\`');
    if(!args[0]) return message.channel.send(`<:xcross:690880230562201610> Please provide a command name to enable >:C`)
    let command = args[0];
      if(bot.commands.has(args[0])){
        command = bot.commands.get(args[0]);
      } else {
        command = bot.commands.get(bot.aliases.get(args[0]));
      }
      let disableChannel = await disable.findOne({
        channelID: message.channel.id
      });
      if(!disableChannel){
        disableChannel = new disable({
          channelID: message.channel.id,
          commandName: []
        });
      }
      if(args[0] == "all"){
        disableChannel.commandName = [];
        await disableChannel.save().catch(e => console.log(e));
      message.channel.send(`<:tickGreen:690880245611626597> Successfully enabled all commands in this channel`)
      } else if(args[0] == "list"){
        let categories = ops.categories;
        let array = Array.from(categories.keys());
        const embed = new discord.RichEmbed()
        .setTitle(`Enabled commands`)
        .setFooter(`This list is the opposite of disabled commands`)
        array.forEach(category => {
          let text = "";
          let co = categories.get(category);
          co.forEach(command => {
            if(!disableChannel.commandName.includes(command)) text += `\`${command}\` `;
          });
          if(text != "") embed.addField(`**${category}**`, `${text}`);
        });
        message.channel.send(embed);
      } else {
        if(command == args[0]) return message.channel.send(`<:xcross:690880230562201610> \`${args[0]}\` is not a command!`)
    
      if(!disableChannel.commandName.includes(command.config.name)) return message.channel.send(`<:xcross:690880230562201610> \`${args[0]}\` is already enabled!`)
      disableChannel.commandName.splice(disableChannel.commandName.indexOf(command.config.name), 1);
      await disableChannel.save().catch(e => console.log(e));
      message.channel.send(`<:tickGreen:690880245611626597> Successfully enabled \`${command.config.name}\` command in this channel`)
      }
}

module.exports.config = {
    name: "enable",
    description: "enables bot commands on channels you specify",
    category: "Moderation",
    usage: "a enable",
    accessableby: "Moderators and Administrators",
    aliases: ["add", "allow"]
  }
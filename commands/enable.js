const disable = require("../models/disable.js"); 

exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply('<:xcross:690880230562201610> you do not have the permission \`MANAGE CHANNELS\`');

    let disableChannel = await disable.findOne({
        guildID: message.guild.id
      });
      
      if(!disableChannel){
        disableChannel = new disable({
          guildID: message.guild.id,
          channelID: []
        });
      }
      if(!disableChannel.channelID.includes(message.channel.id)) return message.channel.send(`<:xcross:690880230562201610> This channel is already enabled!`)
      disableChannel.channelID.splice(disableChannel.channelID.indexOf(message.channel.id), 1);
      await disableChannel.save().catch(e => console.log(e));
      message.channel.send(`<:tickGreen:690880245611626597> Successfully enabled bot commands in this channel`)
}

module.exports.config = {
    name: "enable",
    description: "enables bot commands on channels you specify",
    category: "Moderation",
    usage: "a enable",
    accessableby: "Moderators and Administrators",
    aliases: ["add", "allow"]
  }
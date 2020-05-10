const disable = require("../models/disable.js"); 
const discord = require('discord.js')

exports.run = async function (bot, message, args) {
    let disableChannel = await disable.findOne({
        channelID: message.channel.id
      });
      if(!disableChannel){
        disableChannel = new disable({
            channelID: message.channel.id,
            commandName: [],
            editsOld: [],
            editsNew: [],
            deletes: []
          });
      }
      if(!disableChannel.deletes[0]) return message.channel.send(`<:xcross:690880230562201610> ok bro, there aren't any deleted messages in this channel`)
      if(args[0] == "list"){
        if(disableChannel.deletes.length > 5 && args[1]){
          if(args[1] && !isNaN(args[1])){
            const embed = new discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle(`Deleted messages`)
            let page = args[1] * 5;
            let i;
            let desc = "";Math.ceil(disableChannel.deletes.length / 5)
            if(!disableChannel.deletes[page - 5]) return message.channel.send(`<:xcross:690880230562201610> h-hey, t-that's not a valid page number xC`)
            for(i = page - 5; i < page; i++){
              if(disableChannel.deletes[i]){
                let deleteArray = disableChannel.deletes[i].split("c4acda9b-31e7-4f2d-87ad-aa9d22609fed");//CONTENT, AVATAR, TAG, TIMESTAMP
                let content = deleteArray[0].split("").slice(0, 10).join("");
                if(deleteArray[0].split("").length > 10) content += "**...**";
                desc += `**${i + 1}.** \`${deleteArray[2]}\`\n${content}\n\n`;
              }
            }
            embed.setFooter(`${args[1]}/${Math.ceil(disableChannel.deletes.length / 5)} pages`)
            .setDescription(desc);
            message.channel.send(embed);
          } else return message.channel.send(`<:xcross:690880230562201610> h-hey, t-that's not a number xC`)
        } else {
          const embed = new discord.RichEmbed()
          .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          .setTitle(`Deleted messages`)
          embed.setFooter(`1/${Math.ceil(disableChannel.deletes.length / 5)} pages`);
          let desc = "";
          let num = 0;
          for(i = 0; i < 5; i++){
            if(disableChannel.deletes[i]){
              let deleteArray = disableChannel.deletes[i].split("c4acda9b-31e7-4f2d-87ad-aa9d22609fed");//CONTENT, AVATAR, TAG, TIMESTAMP
              let content = deleteArray[0].split("").slice(0, 10).join("");
              if(deleteArray[0].split("").length > 10) content += "**...**";
              desc += `**${i + 1}.** \`${deleteArray[2]}\`\n${content}\n\n`;
            }
          }
          embed.setDescription(desc)
          message.channel.send(embed);
        }
      } else if(args[0] == "clear"){
        if(disableChannel.deletes[0]){
          disableChannel.deletes = [];
          message.channel.send(`<:tickGreen:690880245611626597> Cleared list of deleted messages!`);
          return await disableChannel.save().catch(e => console.log(e));
        } else return message.channel.send(`<:xcross:690880230562201610> u deaf? there aren't any deleted messages in this channel`)
      } else if(!args[0]){
        if(disableChannel.deletes[0]){
          let deleteArray = disableChannel.deletes[0].split("c4acda9b-31e7-4f2d-87ad-aa9d22609fed");//CONTENT, AVATAR, TAG, TIMESTAMP
          const embed = new discord.RichEmbed()
          .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          .setAuthor(deleteArray[2], deleteArray[1])
          .setDescription(deleteArray[0])
          .setFooter(`1/${disableChannel.deletes.length} sniped • ${deleteArray[3]}`)
          message.channel.send(embed);
        } else return message.channel.send(`<:xcross:690880230562201610> r u blind? There is no deleted message in this channel`);
      } else if(!isNaN(args[0])){
        if(disableChannel.deletes[args[0] - 1]){
          let deleteArray = disableChannel.deletes[args[0] - 1].split("c4acda9b-31e7-4f2d-87ad-aa9d22609fed");//CONTENT, AVATAR, TAG, TIMESTAMP
          const embed = new discord.RichEmbed()
          .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          .setAuthor(deleteArray[2], deleteArray[1])
          .setDescription(deleteArray[0])
          .setFooter(`${args[0]}/${disableChannel.deletes.length} sniped • ${deleteArray[3]}`)
          message.channel.send(embed);
        } else return message.channel.send(`<:xcross:690880230562201610> h-hey, use \`a snipe list\` to check all the sniped messages`);
      } else return message.channel.send(`<:xcross:690880230562201610> u good bro? try using \`a help snipe\``)
}
module.exports.config = {
    name: "snipe",
    description: "Shows the data of deleted messages in channel",
    category: "Miscellaneous",
    usage: "a snipe list/clear",
    accessableby: "Everyone",
    aliases: ["deleted", "deletes"]
  }
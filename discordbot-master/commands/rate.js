
  const Discord = require("discord.js")
 
  module.exports.run = async (bot, message, args) => {
  
  let ratus = message.mentions.members.first();
  if(!ratus) return message.channel.send("Tag someone to rate them!");
  
  let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "69", "gay"];
  
  let result = Math.floor((Math.random() * rates.length));
  
  if(ratus.user.id === message.author.id) {
    return message.channel.send(`**${message.author.username}**, I'd give you ${result}/10 <:thonk:641320052326662155>`);
  } else return message.channel.send(`I'd give **__${ratus.user.username}__** ${result}/10 <:thonk:641320052326662155>`);
  
  }
  
module.exports.config = {
  name: "rate",
  description: "Gives a rating of you or a user you mention",
  category: "Fun",
  usage: "a rate <mention>",
  accessableby: "Everyone",
  aliases: ["rating", "r", ]
}

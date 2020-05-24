const Messages = require("../models/messages.js"); 

exports.run = async (bot, message, args, ops) => {
  const getMember = message.mentions.users.first(); 
  let person = getMember
  if(!person) return message.channel.send(`<:xcross:658850997757804555> NUUUU! mention someone`);
  let saved = await Messages.findOne({
    userID: person.id
  });
  if(message.author.id != '488249600264896523') return message.channel.send(`<:xcross:658850997757804555> Only the owner of this bot can use this command!`)
  if(!args[1]) return message.channel.send(`<:xcross:658850997757804555> NUUUU! specify cash`);
  if(args[1] = NaN) return message.channel.send(`<:xcross:658850997757804555> NUUUU! It's not a number`);
  saved.cash = +args[1];
  saved.save().catch(e => console.log(e));
}

module.exports.config = {
  name: "setcash",
  description: "Sets the amount of cash to a user",
  category: "Bot Owner Only",
  usage: `a setbal <mention> <amount>`,
  accessableby: "Bot Owner (Aaronlauks)",
  aliases: ["setbal", "setmoney"]
}

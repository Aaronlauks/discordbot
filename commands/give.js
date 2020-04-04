const Messages = require("../models/messages.js"); 

exports.run = async (bot, message, args) => {
  const getMember = message.mentions.users.first(); 
  let person = getMember;
  if(message.author.id == person.id) return message.channel.send(`<:xcross:658850997757804555> Bruh you can't just give yourself your own money`);
  if(!args[1]) return message.channel.send(`<:xcross:658850997757804555> Bro you need to give cash and not nothing`);
  if(args[1] == "all") return message.channel.send(`<:xcross:658850997757804555> Are you sure you want to give all your cash?\nIf you do then type out your amount of cash for confirmation.`);
  if(isNaN(args[1])) return message.channel.send(`<:xcross:658850997757804555> Bro if you want to give money use **actual** numbers`);
  if(!person) return message.channel.send(`<:xcross:658850997757804555> you need to **mention** a user to give money`);
  if(args[1] <= 0) return message.channel.send(`<:xcross:658850997757804555> lol poop don't try to break me and give non-existant money`);
  
  let give = args[1];
  const saved1 = await Messages.findOne({
      userID: message.author.id
  });
  const saved2 = await Messages.findOne({
      userID: person.id
  });
  
  if(saved1.cash < give) return message.channel.send(`<:xcross:658850997757804555> lol poop you're too poor to afford that`);
  saved2.cash += +give;
  saved1.cash -= give;
  
  saved1.save().catch(e => console.log(e));
  saved2.save().catch(e => console.log(e));
  message.channel.send(`You gave ${person.username} **$${give}**\nYou now have **$${saved1.cash}**\n${person.username} now has **$${saved2.cash}**`);
}

module.exports.config = {
  name: "give",
  description: "Gives an amount of cash you specify to the user you mention",
  category: "Economy",
  usage: `a give <mention> <cash>`,
  accessableby: "Everyone",
  aliases: ["donate", "gift"]
}

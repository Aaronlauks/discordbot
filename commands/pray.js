const inv = require("../models/inv.js"); 
const Messages = require("../models/messages.js"); 
const { RichEmbed } = require("discord.js");
const recent = new Map();
const pusheen = ["**Pusheen** <a:pusheen:678993182754865162>", "**Stormy** <a:stormy:685819323859861523>", "**Sloth** <a:ssloth:685819308059918427>", "**Pip** <a:pip:685819342767915132>", "**Cheeks** <a:cheeks:685819358923980812>", "**Bo** <a:bo:685819257769951276>"]

exports.run = async (bot, message, args, ops) => {
  const items = ops.items;
  let cooldown = 10000;
  let invUser = await inv.findOne({
    userID: message.author.id
  });
  const saved = await Messages.findOne({
      userID: message.author.id
  });
  if(recent.has(message.author.id) && cooldown - (Date.now() - recent.get(message.author.id)[0]) > 0){
    let timeObj = (cooldown - (Date.now() - recent.get(message.author.id)[0]));
    message.channel.send(`<:xcross:658850997757804555> Bro wait the default cooldown is \`10 seconds\`...\n<a:load:663763329055195157> Please wait **${(timeObj / 1000).toFixed(1)}s**`).then(m => m.delete(timeObj));
  } else {
    let pick = Math.ceil(Math.random() * 100);
    let prayer = Math.floor(Math.random() * 5);
    if(pick > 99){
      message.channel.send(`Pusheen did not like <@${message.author.id}>! all your money has been taken away.`);
      saved.cash = 0;
    } else if(pick == 1){
      let cash = Math.ceil((Math.random() * 5) * 500);
      let itemif = Math.random() * 2;
      let index = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
      let item = items.items[index];
      let msg = `<@${message.author.id}> prayed to ${pusheen[prayer]} and received a whopping **$${cash}**`
      if(itemif > 1) msg += ` and 1 **${item.name}** ${item.emoji}`
      if(itemif > 1) invUser.items.splice(index, 1, invUser.items[index] += 1);
      message.channel.send(msg);
      saved.cash += +cash;
    }else if(pick == 2){
      message.channel.send(`<@${message.author.id}> prayed to ${pusheen[prayer]} and got **nothing**!`);
    }else if(pick > 80){
      let cash = Math.ceil(Math.random() * 75);
      let index = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
      let item = items.items[index];
      message.channel.send(`<@${message.author.id}> prayed to ${pusheen[prayer]} and received **$${cash}** and 1 **${item.name}** ${item.emoji}`);
      invUser.items.splice(index, 1, invUser.items[index] += 1);
      saved.cash += +cash;
    } else if(pick > 30){
      let cash = Math.ceil(Math.random() * 100);
      message.channel.send(`<@${message.author.id}> prayed to ${pusheen[prayer]} and received **$${cash}**`);
      saved.cash += +cash;
    } else {
      let index = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
      let item = items.items[index];
      message.channel.send(`<@${message.author.id}> prayed to ${pusheen[prayer]} and received 1 **${item.name}** ${item.emoji}`);
      invUser.items.splice(index, 1, invUser.items[index] += 1);
    }
    if(recent.has(message.author.id)) recent.delete(message.author.id);
    recent.set(message.author.id, new Array());
    recent.get(message.author.id).push(Date.now());
  }
  invUser.save().catch(e => console.log(e));
  saved.save().catch(e => console.log(e));
}

module.exports.config = {
  name: "pray",
  description: "Pray to someone and they might give u cash!",
  category: "Economy",
  usage: `a pray`,
  accessableby: "Everyone",
  aliases: ["praise", "devote"]
}

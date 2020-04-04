const Messages = require("../models/messages.js"); 
const { RichEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
  const embed = new RichEmbed()
  .setColor("#8a5555")
  .setFooter(
    `© ${message.guild.me.displayName} | pp betting`,
    bot.user.displayAvatarURL
  );
  const getMember = message.mentions.users.first(); 
  let person = getMember
  if(args[1]){
	  if(message.author.id == person.id) return message.channel.send(`<:xcross:658850997757804555> Heck your pp is the same size even if you bet with yourself`);
  }
  const filter = ma => ma.author.id.includes(person.id);
  if(args[0] != "all" && isNaN(args[0])) return message.channel.send(`<:xcross:658850997757804555> Bro if you want to bet use **actual** numbers`);
	
	let bet = args[0] || 1;
	
  if(person){
    const saved1 = await Messages.findOne({
      userID: message.author.id
    });
    const saved2 = await Messages.findOne({
      userID: person.id
    });
	  if(args[0] == "all") bet = saved1.cash;
	  if(bet <= 0) return message.channel.send(`<:xcross:658850997757804555> lol poop don't try to break me and gain money`);
    if(saved1.cash < bet) return message.channel.send(`<:xcross:658850997757804555> lol poop ur too poor to afford that`);
    if(saved2.cash < bet) return message.channel.send(`<:xcross:658850997757804555> ${person.username} is too poor to afford that lol`);
    message.channel.send(`<a:load:663763329055195157> waiting for ${person.username} to respond with \`Accept\`\n\nThis message will expire in 15 seconds...`).then(m => m.delete(15000));
    
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    collector.on('collect', ma => {
      if(ma.content.toLowerCase().includes('accept')) {
      message.channel.fetchMessages().then(msgs => {
	    let msgDel = msgs.filter(msgss => msgss.content.includes(`waiting`)) // Finds all messages with 'check'
	    message.channel.bulkDelete(msgDel)
	    });
      const ok = Math.random() * 100;
      const person1 = Math.floor(ok / 10);
      const boomer = Math.random() * 100;
      const person2 = Math.floor(boomer / 10);
      collector.stop()
      const pp1 = "8" + "=".repeat(person1) + "D";
      const pp2 = "8" + "=".repeat(person2) + "D";

      embed.addField(`${message.author.username}'s pp`, pp1);
      embed.addField(`${person.username}'s pp`, pp2);
      if(person1 > person2){
        let prize = Math.ceil(bet * saved1.multiplier);
        let now1 = saved1.cash + prize;
        let now2 = saved2.cash - bet;
        embed.setTitle(`${message.author.username} pp's bigger!`)
        .setDescription(`${message.author.username} won \`$${prize}\`\nMultiplier \`${saved1.multiplier}%\`\n\n${message.author.username} now has \`$${now1}\`\n${person.username} now has \`$${now2}\``); 
        saved1.cash += prize;
        saved2.cash -= bet;
        if(saved1.uses >= 1) saved1.uses -= 1; 
      } else if(person1 == person2){
        embed.setTitle(`It's a tie!`)
        .setDescription(`You both keep \`$${bet}\``); 
      } else {
        let prize = Math.ceil(bet * saved2.multiplier);
        let now1 = saved1.cash - bet;
        let now2 = saved2.cash + prize;
        embed.setTitle(`${person.username} pp's bigger!`)
        .setDescription(`${person.username} won \`$${prize}\`\nMultiplier \`${saved2.multiplier}%\`\n\n${message.author.username} now has \`$${now1}\`\n${person.username} now has \`$${now2}\``);
        saved2.cash += prize;
        if(saved2.uses >= 1) saved2.uses -= 1; 
        saved1.cash -= bet;
      }
      message.channel.send(embed)
       saved1.save().catch(e => console.log(e));
       saved2.save().catch(e => console.log(e));
      }
    });
        
  } else {
	 
    const saved1 = await Messages.findOne({
      userID: message.author.id
    });
	  if(args[0] == "all") bet = saved1.cash;
	  if(bet <= 0) return message.channel.send(`<:xcross:658850997757804555> lol poop don't try to break me and gain money`);
    if(saved1.cash < bet) return message.channel.send(`<:xcross:658850997757804555> lol poop ur too poor to afford that`);
    
    const ok = Math.random() * 100;
    const person1 = Math.floor(ok / 10);
    const boomer = Math.random() * 100;
    const person2 = Math.floor(boomer / 10);
    const pp1 = "8" + "=".repeat(person1) + "D";
    const pp2 = "8" + "=".repeat(person2) + "D";
    embed.addField(`${message.author.username}'s pp`, pp1);
      embed.addField(`Aaron's pp`, pp2);
    if(person1 > person2){
        let prize = Math.ceil(bet * saved1.multiplier);
      let now = saved1.cash + prize;
        embed.setTitle(`${message.author.username} pp's bigger!`)
      .setColor("#00ff15")
        .setDescription(`${message.author.username} won \`$${prize}\`\nMultiplier \`${saved1.multiplier}%\`\n\nYou now have \`$${now}\``); 
        saved1.cash += prize;
        if(saved1.uses >= 1) saved1.uses -= 1; 
      } else if(person1 == person2){
        embed.setTitle(`It's a tie!`)
        .setDescription(`Ur pp both the same size lol`); 
      } else {
        let now = saved1.cash - bet;
        embed.setTitle(`Your pp's smaller than Aaron!`)
	      .setColor("#ff0000")
        .setDescription(`You lost $${bet}\n\nYou now have \`$${now}\``);
        saved1.cash -= bet;
      }
	  saved1.save().catch(e => console.log(e));
	  message.channel.send(embed)
  }
}

module.exports.config = {
  name: "penis",
  description: "Bet against Aaron or someone else's pp size!",
  category: "Economy",
  usage: "a penis <cash> <mention>",
  accessableby: "Everyone",
  aliases: ["pickle", "pp", "bet"]
}

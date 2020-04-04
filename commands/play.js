const inv = require("../models/inv.js"); 
const Messages = require("../models/messages.js"); 
const { RichEmbed } = require("discord.js");
const recent = new Map();
const pusheen = ["**Pusheen** <a:pusheen:678993182754865162>", "**Stormy** <a:stormy:685819323859861523>", "**Sloth** <a:ssloth:685819308059918427>", "**Pip** <a:pip:685819342767915132>", "**Cheeks** <a:cheeks:685819358923980812>", "**Bo** <a:bo:685819257769951276>"]

exports.run = async (bot, message, args, ops) => {
  let game = ["spam", "tic tac toe", "feed", "rps"]
  const items = ops.items;
  let cooldown = 300000;
  let invUser = await inv.findOne({
    userID: message.author.id
  });
  const saved = await Messages.findOne({
      userID: message.author.id
  });
  
  if(recent.has(message.author.id) && cooldown - (Date.now() - recent.get(message.author.id)[0]) > 0 && recent.get(message.author.id)[3] == "ongoing"){
    if(recent.get(message.author.id)[2] == "feed"){
      let cu = "";
      let amt = 0;
      let index = "";
      let want = "";
      let canFeed = true;
      recent.get(message.author.id)[4].forEach(item =>{
        if(item != cu){ 
          if(amt > 0){
            index = items.index.indexOf(cu);
            if(invUser.items[index] < amt) canFeed = false;
          }
          cu = item;
          amt = 1;
        } else {
          amt++;
        }
      });
      index = items.index.indexOf(cu);
      if(invUser.items[index] < amt) canFeed = false;
      if(canFeed){
        let num = "";
        amt = 0;
        recent.get(message.author.id)[4].forEach(item =>{
          if(item != cu){
            if(amt > 0){
              num = items.index.indexOf(cu);
              console.log(items.index[num], invUser.items[num], amt)
              invUser.items.splice(num, 1, invUser.items[num] -= amt);
            }
            cu = item;
            amt = 1;
          } else {
            amt++;
          }
        });
        num = items.index.indexOf(cu);
        invUser.items.splice(num, 1, invUser.items[num] -= amt);
        console.log(invUser.items[num], amt)
        let fed = `<:green_tick:658850714906525697> You fed ${recent.get(message.author.id)[1]} and received`;
        let cash = Math.ceil(Math.random() * 2000) + 1000;
        fed += ` a whopping **$${cash}**!`;
        let fruit = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
        let item = items.items[fruit];
        let rando = Math.ceil(Math.random() * 100)
        if(rando > 70) {
          fed += ` and 5 **${item.name}** ${item.emoji}`
          invUser.items.splice(fruit, 1, invUser.items[fruit] += 5);
        }
        saved.cash += +cash;
        recent.get(message.author.id)[3] = "done";
        message.channel.send(fed);
      } else {
        const embed = new RichEmbed()
        .setColor("#8a5555")
        .setTitle(`Ongoing minigame!`);
        recent.get(message.author.id)[4].sort();
        let dec = `${recent.get(message.author.id)[1]} is wants:\n\n`;
        amt = 0;
        recent.get(message.author.id)[4].forEach(item =>{
          if(item != cu){
            if(amt > 0){
              index = items.index.indexOf(cu);
              if(invUser.items[index] < amt) {
                want = items.items[index];
                dec += `${amt} **${want.name}** ${want.emoji}\n`
              } else {
                want = items.items[index];
                dec += `~~${amt} **${want.name}** ${want.emoji}~~\n`
              }
            }
            cu = item;
            amt = 1;
          } else {
            amt++;
          }
        });
        index = items.index.indexOf(cu);
        if(invUser.items[index] < amt) {
          want = items.items[index];
          dec += `${amt} **${want.name}** ${want.emoji}\n`
        } else {
          want = items.items[index];
          dec += `~~${amt} **${want.name}** ${want.emoji}~~\n`
        }
        embed.setDescription(dec)
          .setFooter(`type <a play> again once you have the items`);
        message.channel.send(embed)
      }
    } else if(recent.get(message.author.id)[2] == "tic tac toe"){
      message.delete();
      if(!args[1]) return message.channel.send(`<:xcross:658850997757804555> Dude to Choose a box, type "a play <column> <row>"\n\`<column>\` \`<row>\` is the position of the column and row\n\n(e.g top left = a play 1 1, middle right = a play 2 3, bottom middle = a play 3 2 etc.)`).then(m => m.delete(15000));
      if(isNaN(args[0]) || isNaN(args[1])) return message.channel.send(`<:xcross:658850997757804555> Come on bro, you need to specify a **number**`).then(m => m.delete(10000));
      if(args[0] > 3 || args[1] > 3 || args[0] < 1 || args[1] < 1) return message.channel.send(`<:xcross:658850997757804555> Excuse me? Tic Tac Toe is a 3x3 grid. Why would a column or row be greater than 3`).then(m => m.delete(10000));
      if(recent.get(message.author.id)[4][args[0] - 1][args[1] - 1] != "⬜") return message.channel.send(`<:xcross:658850997757804555> Urm that box is already taken. Try another box!`).then(m => m.delete(10000));
      recent.get(message.author.id)[4][args[0] - 1][args[1] - 1] = "❌";
      
      let column = [];
      var i = 0;
      var done = false;
      for(i = 0; i < 3; i++){
        if(recent.get(message.author.id)[4][i].includes("⬜")) column.push(i);
      }
      let randomColumn = Math.ceil(Math.random() * column.length) - 1;
        
      let row = [];
      for(i = 0; i < 3; i++){
        if(recent.get(message.author.id)[4][column[randomColumn]][i].includes("⬜")) row.push(i);
      }

      let randomRow = Math.ceil(Math.random() * row.length) - 1;
      recent.get(message.author.id)[4][column[randomColumn]][row[randomRow]] = "⭕";
      message.channel.fetchMessages({around: recent.get(message.author.id)[5], limit: 1})
        .then(msg => {
        const fetchedMsg = msg.first();
        if(fetchedMsg) fetchedMsg.edit(`${recent.get(message.author.id)[4][0][0]}${recent.get(message.author.id)[4][0][1]}${recent.get(message.author.id)[4][0][2]}\n${recent.get(message.author.id)[4][1][0]}${recent.get(message.author.id)[4][1][1]}${recent.get(message.author.id)[4][1][2]}\n${recent.get(message.author.id)[4][2][0]}${recent.get(message.author.id)[4][2][1]}${recent.get(message.author.id)[4][2][2]}`);
        if(!fetchedMsg){
          message.channel.send(`\n\n${recent.get(message.author.id)[4][0][0]}${recent.get(message.author.id)[4][0][1]}${recent.get(message.author.id)[4][0][2]}\n${recent.get(message.author.id)[4][1][0]}${recent.get(message.author.id)[4][1][1]}${recent.get(message.author.id)[4][1][2]}\n${recent.get(message.author.id)[4][2][0]}${recent.get(message.author.id)[4][2][1]}${recent.get(message.author.id)[4][2][2]}`);
          message.channel.fetchMessages().then(messages => {
            let editmsg = messages.filter(m => m.author.id.includes('574910890399236104') && m.content.includes("⬜"));
            recent.get(message.author.id).push(editmsg.first().id);//5
          });
        }
      });
      var win = false;
      var lose = false;
      console.log(recent.get(message.author.id)[4][0])
      console.log(recent.get(message.author.id)[4][0] == ["❌", "❌", "❌"])
      if((recent.get(message.author.id)[4][0][0] == "❌" && recent.get(message.author.id)[4][0][1] == "❌" && recent.get(message.author.id)[4][0][2] == "❌") || (recent.get(message.author.id)[4][1][0] == "❌" && recent.get(message.author.id)[4][1][1] == "❌" && recent.get(message.author.id)[4][1][2] == "❌") || (recent.get(message.author.id)[4][2][0] == "❌" && recent.get(message.author.id)[4][2][1] == "❌" && recent.get(message.author.id)[4][2][2] == "❌")) win = true;
      if((recent.get(message.author.id)[4][0][0] == "❌" && recent.get(message.author.id)[4][1][0] == "❌" && recent.get(message.author.id)[4][2][0] == "❌") || (recent.get(message.author.id)[4][0][1] == "❌" && recent.get(message.author.id)[4][1][1] == "❌" && recent.get(message.author.id)[4][2][1] == "❌") || (recent.get(message.author.id)[4][0][2] == "❌" && recent.get(message.author.id)[4][1][2] == "❌" && recent.get(message.author.id)[4][2][2] == "❌")) win = true;
      if((recent.get(message.author.id)[4][0][0] == "❌" && recent.get(message.author.id)[4][1][1] == "❌" && recent.get(message.author.id)[4][2][2] == "❌") || (recent.get(message.author.id)[4][0][2] == "❌" && recent.get(message.author.id)[4][1][1] == "❌" && recent.get(message.author.id)[4][2][0] == "❌")) win = true;
      
      if((recent.get(message.author.id)[4][0][0] == "⭕" && recent.get(message.author.id)[4][0][1] == "⭕" && recent.get(message.author.id)[4][0][2] == "⭕") || (recent.get(message.author.id)[4][1][0] == "⭕" && recent.get(message.author.id)[4][1][1] == "⭕" && recent.get(message.author.id)[4][1][2] == "⭕") || (recent.get(message.author.id)[4][2][0] == "⭕" && recent.get(message.author.id)[4][2][1] == "⭕" && recent.get(message.author.id)[4][2][2] == "⭕")) lose = true;
      if((recent.get(message.author.id)[4][0][0] == "⭕" && recent.get(message.author.id)[4][1][0] == "⭕" && recent.get(message.author.id)[4][2][0] == "⭕") || (recent.get(message.author.id)[4][0][1] == "⭕" && recent.get(message.author.id)[4][1][1] == "⭕" && recent.get(message.author.id)[4][2][1] == "⭕") || (recent.get(message.author.id)[4][0][2] == "⭕" && recent.get(message.author.id)[4][1][2] == "⭕" && recent.get(message.author.id)[4][2][2] == "⭕")) lose = true;
      if((recent.get(message.author.id)[4][0][0] == "⭕" && recent.get(message.author.id)[4][1][1] == "⭕" && recent.get(message.author.id)[4][2][2] == "⭕") || (recent.get(message.author.id)[4][0][2] == "⭕" && recent.get(message.author.id)[4][1][1] == "⭕" && recent.get(message.author.id)[4][2][0] == "⭕")) lose = true;
      
      var done = true;
      for(i = 0; i < 3; i++){
        if(recent.get(message.author.id)[4][i].includes("⬜")) done = false;
      }
      console.log(win, lose, done)
      if(win){
        let cash = Math.ceil(Math.random() * 1500) + 500;
        let tic = `<:green_tick:658850714906525697> You beat Aaron in Tic Tac Toe and got a whopping **$${cash}**`
        let fruit = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
        let item = items.items[fruit];
        let rando = Math.ceil(Math.random() * 100)
        if(rando > 70) {
            tic += ` and 5 **${item.name}** ${item.emoji}`
            invUser.items.splice(fruit, 1, invUser.items[fruit] += 5);
          }
          message.channel.send(tic);
          saved.cash += +cash;
        recent.get(message.author.id)[3] = "done";
      } else if(lose){
        let cash = Math.ceil(Math.random() * 1500) + 500;
        if(saved.cash < cash) {
          saved.cash = 0;
          message.channel.send(`<:xcross:658850997757804555> Bruh you lost and lost **all** your cash`);
        } else {
          saved.cash -= cash;
          message.channel.send(`<:xcross:658850997757804555> Bruh you lost and Aaron took **$${cash}** from you`);
        }
        recent.get(message.author.id)[3] = "done";
      } else if(done){
          message.channel.send(`<:tsukishi:690217206692315268> It's a draw soo.... \`Nothing happens\``);
          recent.get(message.author.id)[3] = "done";
      }
    } else if(recent.get(message.author.id)[2] == "rps"){
      if(!args[0]) return message.channel.send(`<:xcross:658850997757804555> Dood you need to choose something! To choose, type "a play <choice>"\n\`<choice>\` is where you choose either **Rock, Paper or Scissors**`);
      if(!args[0].toLowerCase().includes("rock") && !args[0].toLowerCase().includes("paper") && !args[0].toLowerCase().includes("scissor")) return message.channel.send(`<:xcross:658850997757804555> Bruh choose either **Rock, Paper or Scissors**`);
     
      let choice = "";
      if(args[0].toLowerCase().includes("rock")) choice = "🗻";
      if(args[0].toLowerCase().includes("paper")) choice = "📰";
      if(args[0].toLowerCase().includes("scissor")) choice = "✂️";
      if(choice == "") return message.channel.send(`<:xcross:658850997757804555> Don't fool me...`);
      let winChoices = [["🗻", "✂️"], ["📰", "🗻"], ["✂️", "📰"]]
      let game = "lose";
      if(choice != recent.get(message.author.id)[4]){
        let current = [choice, recent.get(message.author.id)[4]];
        if((current[0] == winChoices[0][0] && current[1] == winChoices[0][1]) || (current[0] == winChoices[1][0] && current[1] == winChoices[1][1]) || (current[0] == winChoices[2][0] && current[1] == winChoices[2][1])) game = "win";
      } else {
        game = "tie";
      }
      
      if(game == "win"){
        let cash = Math.ceil(Math.random() * 1500) + 500;
        let tic = `\`You: ${choice}\` \`Aaron: ${recent.get(message.author.id)[4]}\`\n\n<:green_tick:658850714906525697> You beat Aaron in Rock Paper Scissors and got a whopping **$${cash}**`
        let fruit = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
        let item = items.items[fruit];
        let rando = Math.ceil(Math.random() * 100)
        if(rando > 70) {
            tic += ` and 5 **${item.name}** ${item.emoji}`
            invUser.items.splice(fruit, 1, invUser.items[fruit] += 5);
          }
          message.channel.send(tic);
          saved.cash += +cash;
        recent.get(message.author.id)[3] = "done";
      } else if(game == "tie"){
        message.channel.send(`\`You: ${choice}\` \`Aaron: ${recent.get(message.author.id)[4]}\`\n\n<:tsukishi:690217206692315268> It's a draw soo.... \`Nothing happens\``);
        recent.get(message.author.id)[3] = "done";
      } else {
        let cash = Math.ceil(Math.random() * 500) + 500;
        if(saved.cash < cash) {
          saved.cash = 0;
          message.channel.send(`\`You: ${choice}\` \`Aaron: ${recent.get(message.author.id)[4]}\`\n\n<:xcross:658850997757804555> OOF you lost and lost **all** your cash`);
        } else {
          saved.cash -= cash;
          message.channel.send(`\`You: ${choice}\` \`Aaron: ${recent.get(message.author.id)[4]}\`\n\n<:xcross:658850997757804555> OOF you lost and Aaron took **$${cash}** from you`);
        }
        recent.get(message.author.id)[3] = "done";
      }
    }
  } else if(recent.has(message.author.id) && cooldown - (Date.now() - recent.get(message.author.id)[0]) > 0)  {
    let timeObj = (cooldown - (Date.now() - recent.get(message.author.id)[0]));
    let minutes = Math.floor(timeObj / 60000);
    let seconds = ((timeObj % 60000) / 1000).toFixed(1);
    message.channel.send(`<:xcross:658850997757804555> Bro wait the default cooldown is \`5 minutes\`...\n<a:load:663763329055195157> Please wait **${minutes}m ${seconds}s**`).then(m => m.delete(timeObj));
  } else {
    let prayer = Math.floor(Math.random() * 5);
    let firstIndex = Math.ceil(Math.random() * game.length) - 1;
    let first = game[firstIndex];
    console.log(firstIndex, game)
    game.splice(firstIndex, 1);
    let secondIndex = Math.ceil(Math.random() * game.length) - 1;
    let second = game[secondIndex];
    console.log(secondIndex, game)
    game.splice(secondIndex, 1);
    let thirdIndex = Math.ceil(Math.random() * game.length) - 1;
    let third = game[thirdIndex];
    console.log(thirdIndex, game)
    game.splice(thirdIndex, 1);
    message.channel.send(`🔍What minigame do you want to choose? Type your choice in chat.\n\`${first}\` | \`${second}\` | \`${third}\``);
    let minigame = "";
    if(recent.has(message.author.id)) recent.delete(message.author.id);
    recent.set(message.author.id, new Array());
    recent.get(message.author.id).push(Date.now());//0
    recent.get(message.author.id).push(pusheen[prayer]);//1
    
    const filter = ma => ma.author.id.includes(message.author.id);
    const collector = message.channel.createMessageCollector(filter, { time: 30000 });
    collector.on('collect', ma => {
      console.log(ma.content);
      if(ma.content.toLowerCase().includes(first)) {
        minigame = first;
        collector.stop();
      } else if(ma.content.toLowerCase().includes(second)) {
        minigame = second;
        collector.stop();
      } else if(ma.content.toLowerCase().includes(third)) {
        minigame = third;
        collector.stop();
      }
    });
    
    collector.on('end', ma => {
      if(!minigame) message.channel.send(`<:xcross:658850997757804555> Bro u didn't even choose. Have fun waiting another \`5 minutes\` smh...`);
      if(!minigame) return recent.get(message.author.id).push("done");//3
      recent.get(message.author.id).push(minigame);//2
    recent.get(message.author.id).push("ongoing");//3
    const embed = new RichEmbed()
    .setColor("#8a5555");
    console.log(minigame)
    
    if(minigame == "feed"){
      recent.get(message.author.id).push(new Array());
      for(var i = 0; i < 7; i++){
        let index = Math.floor(Math.random() * (invUser.items.length - 1)) + (invUser.items.length - 20);
        let item = items.index[index];
        recent.get(message.author.id)[4].push(item);
      }
      recent.get(message.author.id)[4].sort();
      let descm = `Feed ${recent.get(message.author.id)[1]} the \`Food items\` listed below\n\n`;
      let cu = "";
      let amt = 0;
      let index = "";
      let want = "";
      recent.get(message.author.id)[4].forEach(item =>{
        if(item != cu){
          if(amt > 0){
            index = items.index.indexOf(cu);
            want = items.items[index];
            descm += `${amt} **${want.name}** ${want.emoji}\n`
          }
          cu = item;
          amt = 1;
        } else {
          amt++;
        }
      });
      index = items.index.indexOf(cu);
      want = items.items[index];
      descm += `${amt} **${want.name}** ${want.emoji}\n`
      embed.setDescription(descm)
      .setTitle(`Feed ${recent.get(message.author.id)[1]}`)
      .setFooter(`type <a play> again once you have the items`);
      message.channel.send(embed);
    } else if(minigame == "spam"){
      const random = ["pusheen", "sloth", "stormy", "bo", "pip", "cheeks", "bruh", "oof"]
      let index = Math.floor(Math.random() * random.length);
      let spamAmt = Math.ceil(Math.random() * 3) + 5;
      message.channel.send(`<a:fSpam:689722532173053990> __**SPAM**__ <a:fSpam:689722532173053990>\n\nHURRY! You have \`5 seconds\` to spam __${random[index]}__ ${spamAmt} times and you will get a prize!`);
      const filter = ma => ma.author.id.includes(message.author.id);
      const collector = message.channel.createMessageCollector(filter, { time: 10000 });
      let amt = 0;

      collector.on('collect', ma => {
        if(ma.content.toLowerCase().includes(random[index])){
          amt++;
        }
      });
      collector.on('end', collected => {
        if(amt >= spamAmt) {
          let cash = Math.ceil(Math.random() * 1500) + 500;
          let spam = `<:green_tick:658850714906525697> You spammed __${random[index]}__ and got a whopping **$${cash}**`
          let fruit = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
          let item = items.items[fruit];
          let rando = Math.ceil(Math.random() * 100)
          if(rando > 70) {
            spam += ` and 5 **${item.name}** ${item.emoji}`
            invUser.items.splice(fruit, 1, invUser.items[fruit] += 5);
          }
          message.channel.send(spam);
          saved.cash += +cash;
        } else {
          message.channel.send(`<:xcross:658850997757804555> Bruh ur slow af. You only needed to spam __${random[index]}__ ${Math.abs(amt - spamAmt)} more time...`);
        }
      });
      recent.get(message.author.id)[3] = "done";
    } else if(minigame == "tic tac toe"){
      recent.get(message.author.id).push([
        ["⬜", "⬜", "⬜"],
        ["⬜", "⬜", "⬜"],
        ["⬜", "⬜", "⬜"]
        ]);
      let column = Math.ceil(Math.random() * 2);
      let row = Math.ceil(Math.random() * 2);
      recent.get(message.author.id)[4][column][row] = "⭕";
      message.channel.send(`❌ __**TIC TAC TOE**__ ⭕\n\nPlay Tic Tac Toe against Aaron!\nPick a square by typing "a play <column> <row>" (e.g. top left = a play 1 1, middle right = a play 2 3 etc.)\n\n\`You: ❌\`\n\`Aaron: ⭕\``);
      
      message.channel.send(`${recent.get(message.author.id)[4][0][0]}${recent.get(message.author.id)[4][0][1]}${recent.get(message.author.id)[4][0][2]}\n${recent.get(message.author.id)[4][1][0]}${recent.get(message.author.id)[4][1][1]}${recent.get(message.author.id)[4][1][2]}\n${recent.get(message.author.id)[4][2][0]}${recent.get(message.author.id)[4][2][1]}${recent.get(message.author.id)[4][2][2]}`);
      message.channel.fetchMessages().then(messages => {
        let editmsg = messages.filter(m => m.author.id.includes('574910890399236104') && m.content.includes("⬜"));
        recent.get(message.author.id).push(editmsg.first().id);//5
      });
    } else if(minigame == "rps"){
      message.channel.send(`__**Rock 🗻 Paper 📰 Scissors ✂️**__\n\nPlay Rock Paper Scissors against Aaron!\nTo choose, type "a play <choice>"\n\`<choice>\` is where you choose either **Rock, Paper or Scissors**!`);
      const rps = ["🗻", "📰", "✂️"];
      let index = Math.ceil(Math.random() * 2);
      recent.get(message.author.id).push(rps[index]);//4
    }
    });
  }
  invUser.save().catch(e => console.log(e));
  saved.save().catch(e => console.log(e));
}

module.exports.config = {
  name: "play",
  description: "Play a game with Pusheen and friends",
  category: "Economy",
  usage: `a play`,
  accessableby: "Everyone",
  aliases: ["pet", "game", "minigame"]
}

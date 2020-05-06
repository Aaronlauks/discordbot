var bannedwords = ["fuck", "slut", "rape", "lolicon", "motherfucker", "loli", "f u c k", "lolli", "fvck", "fuk", "bitch", "lollicon", "lolicom", "porn", "sex"];
let deleteChannels = ['682721467468611634', '682200283714945045', '684399471811231754', '673501879451516940', '698127929820839966'];
const OauthClient = require('disco-oauth')
let oauthClient = new OauthClient('574910890399236104');
const discord = require("discord.js"); 
const config = require("./config.json");
const items = require("./items.json");
const fs = require("fs");
const recent = new Map();
const dm = new Map();
const bot = new discord.Client({ disableEveryone: true });

const mongoose = require('mongoose');
mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Messages = require('./models/messages.js');
const inv = require('./models/inv.js');
const disable = require('./models/disable.js');


bot.aliases = new discord.Collection();
const categories = new Map(); 
bot.commands = new discord.Collection();
bot.uses = new discord.Collection();
bot.events = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.config.name, props);
    props.config.aliases.forEach(aliases => {
      bot.aliases.set(aliases, props.config.name);
    });
    if(props.config.category != "Bot Owner Only" && !categories.get(props.config.category)) categories.set(props.config.category, new Array());
    if(props.config.category != "Bot Owner Only") categories.get(props.config.category).push(props.config.name);
  });
});
fs.readdir("./events/", (err, files) => {
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  jsfile.forEach((f, i) => {
    let props = require(`./events/${f}`);
    bot.events.set(props.config.name, props);
  });
});
fs.readdir("./uses/", (err, files) => {
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  jsfile.forEach((f, i) => {
    console.log(f);
    let props = require(`./uses/${f}`);
    bot.uses.set(props.config.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.tag}`);
  var time = new Date().getTime();
    var date = new Date(time);
  const embed = new discord.RichEmbed()
  .setColor(`#00ff15`)
  .setTitle(`Build started`)
  .setDescription("Bot is up!")
  .setTimestamp(date)
  .setFooter(
        `© Aaron's Bot | Bot reset`,
        bot.user.displayAvatarURL
      )
  .addField(`Time started`, date.toString());
  bot.channels
.get("684399471811231754")
.send(embed)
.catch();
  let statuses = [
    `okie`,
    `covid-20`,
    `ㅇㅅㅇ`,
    `Wear a mask!`,
    `DM me for help!`,
    `${config.prefix}help`,
    `Prefix | (${config.prefix})`,
    `${bot.guilds.size} servers!`,
    `Made by Aaronlauks`,
    `${config.prefix}help <command>`,
    `coronavirus can't hurt me!`
  ];
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {
      type: "STREAMING",
      url: "https://www.twitch.tv/AaronBotDiscord"
    });
  }, 10000);
  bot.user.setActivity(statuses);
});



bot.on('message', message => { //this event is fired, whenever the bot sees a new message
   if (message.isMemberMentioned(bot.user) && !message.content.includes(`@everyone`)) { 
     message.channel.send(`My prefix is \`${config.prefix}\` so please stop pinging me ;-;`); 
   }
});

bot.on("message", msg => {
  //one word stories
  if (msg.channel.name == "one-word-story") {
    var mc1 = msg.content.split(" ")[1];
    var mc2 = msg.content.split("_")[1];
    var mc3 = msg.content.split("-")[1];
    var mc4 = msg.content.split(".")[1];
    var mc5 = msg.content.split(",")[1];
    if (mc1 || mc2 || mc3 || mc4 || mc5) {
      msg.delete();
      msg.author.sendMessage(
        "You can only send one word in #one-word-stories!"
      );
    }
  }
});

let number = 0;
bot.on("message", message => {
  if (message.author.bot) return;
  if(deleteChannels.includes(message.channel.id)){
    message.delete();
  }
  if(message.channel.type != "dm" && message.channel.topic && message.channel.topic.includes(`Tag+ID: `)){
    let id = message.channel.topic.trim().split(/ +/g);
    if(!dm.has(id[2])) {
      message.channel.delete();
    } else {
      if(dm.get(id[2])[1] === "unverified"){
        let mc = message.content.trim().split(/ +/g);
        if(mc[0] !== "verify" && mc[0] !== "cancel") {
          message.channel.send(`<:xcross:690880230562201610> Please type 'verify' to start the ticket. Type 'cancel <reason>' to cancel the ticket.`)
        } else {
          if(mc[0] == "verify") {
            dm.get(id[2])[1] = "verified";
            const embed = new discord.RichEmbed().setTitle(`Ticket Verified`).setColor("#00ff15").setTimestamp().setAuthor(`${message.author.tag}`, message.author.avatarURL);
            message.channel.send(embed);
            embed.setDescription(`This is the start of your ticket!\nType to send a message!`)
            dm.get(id[2])[2].sendMessage(embed)
            bot.channels.get("696205702519062548").send(embed);
          } else {
            const embed = new discord.RichEmbed().setTitle(`Ticket Cancelled`).setColor("#ff0000").setTimestamp().setAuthor(`${message.author.tag}`, message.author.avatarURL);
            message.channel.send(embed);
            mc.shift();
            embed.setDescription(`Your ticket has been cancelled by ${message.author.tag}!`).addField(`Reason`, (mc.join(" ") || "None provided"));
            dm.get(id[2])[2].sendMessage(embed);
            dm.delete(id[2]);
            bot.channels.get("696205702519062548").send(embed);
          }
        }
      } else {
        let mc = message.content.trim().split(/ +/g);
        if(mc[0] == "resolve"){
          const embed = new discord.RichEmbed().setTitle(`Ticket Resolved`).setColor("#ff0000").setTimestamp().setAuthor(`${message.author.tag}`, message.author.avatarURL);
          message.channel.send(embed);
          mc.shift();
          embed.addField('Resolved:', mc.join(" "));
          dm.get(id[2])[2].sendMessage(embed);
          bot.channels.get("696205702519062548").send(embed);
          dm.delete(id[2]);
        } else {
          const embed = new discord.RichEmbed().setAuthor(`${message.author.username}: ${message.content}`, message.author.avatarURL).setColor('#36393f');
          dm.get(id[2])[2].sendMessage(embed)
        }
      }
    }
  }
    if (message.channel.type === "dm") {
      let mc = message.content;
      let mem = message.author;
      const embed = new discord.RichEmbed();
      embed.setAuthor(`${mem.username}: ${mc}`, mem.avatarURL);
      bot.channels.get("673501879451516940").send(embed).catch();
      if(dm.has(message.author.id)) {
        if(dm.get(message.author.id)[1] === "unverified"){
          message.author.sendMessage(`<:xcross:690880230562201610> You're ticket has not been started! Please wait for verification.`)
        } else {
          embed.setColor('#36393f')
          bot.channels.get(dm.get(message.author.id)[0]).send(embed).catch();
        }
        if(message.content === "cancel") {
          let dChannel = bot.guilds.get('662687974466781185').channels.get(dm.get(message.author.id)[0])
          dChannel.delete();
          dm.delete(message.author.id);
          message.author.sendMessage("<:xcross:690880230562201610> Ticket cancelled!")
          bot.channels.get("696205702519062548").send(`<:xcross:690880230562201610> ${message.author.tag} Ticket cancelled!`);
        }
      } else {
        number++;
        let id = "";
        dm.set(message.author.id, new Array());
        bot.guilds.get('662687974466781185').createChannel(`Ticket-${number}`, {
          type: "text",
          topic: `Tag+ID: ${message.author.tag} ${message.author.id}`,
          parent: "696205941510766673"
        }).then(channel =>{
          id = channel.id;
        }).then(ok =>{
        dm.get(message.author.id).push(id);// 0
        dm.get(message.author.id).push("unverified");// 1
        dm.get(message.author.id).push(message.author);// 2
        const embed = new discord.RichEmbed().setAuthor(`Start of ${message.author.username}'s ticket:`, message.author.avatarURL).setDescription(mc).setTimestamp();
        bot.channels.get(id).send(embed).catch();
        bot.channels.get("696205702519062548").send(embed).catch();
        message.author.sendMessage("🎟️ New ticket made! Type 'cancel' anytime to cancel your ticket.")
        })
      }
    }
});





//message event
bot.on("message", async message => {
  let cooldown = 5000;
  let prefix = config.prefix;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  
  
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let args = message.content.slice(prefix.length).trim().split(/ +/g); //args is the inputs after the cmd(a$say | test: |,test)
  let cmd = args.shift().toLowerCase(); //cmd is the command name (a help: help)
  let command;
  if (sender.bot) return;
  let disableChannels = await disable.findOne({
    channelID: message.channel.id
  });
  
  let ops = {
      categories: categories,
      items: items
    }
  
  
  try {
    if(bot.commands.has(cmd)){
      command = bot.commands.get(cmd);
    } else {
      command = bot.commands.get(bot.aliases.get(cmd));
    }
    if(disableChannels && disableChannels.commandName.includes(command.config.name)) return message.channel.send(`<:xcross:690880230562201610> \`${cmd}\` command is disabled in this channel!`).then(m => m.delete(3000));
    command.run(bot, message, args, ops);
  } catch (e) {
    console.log(`${cmd} is not a command`);
  } finally {
    console.log(`${message.author.username} ran the command: ${cmd}`);
  }
  
  let chance = Math.ceil(Math.random() * 100);
  let choose = "";
  if(chance == 99) choose = event();
  if(choose) {
    try {
      let event = bot.events.get(choose);
      event.run(bot, message);
    } catch (e) {
      console.log(`No event loaded :C`);
    } finally {
      console.log(`event ${choose} has started!`)
    }
  }
  if(recent.has(message.author.id) && cooldown - (Date.now() - recent.get(message.author.id)[0]) > 0){
    let timeObj = (cooldown - (Date.now() - recent.get(message.author.id)[0]));
    message.channel.send(`<:xcross:658850997757804555> Bro wait the default cooldown is \`5 seconds\`...\n<a:load:663763329055195157> Please wait **${(timeObj / 1000).toFixed(1)}s**`).then(m => m.delete(timeObj));
  } else {
  if(cmd == "use" || cmd == "eat" || cmd == "consume"){
      try {
      command = bot.uses.get(args[0]);
       let invUser = await inv.findOne({
         userID: message.author.id
       });
        let index = items.index.indexOf(args[0].toLowerCase());
        if(invUser.items[index] < 1) command = bot.uses.get("noItem");
      command.run(bot, message, args, ops);
        if(recent.has(message.author.id)) recent.delete(message.author.id);
    recent.set(message.author.id, new Array());
    recent.get(message.author.id).push(Date.now());
    } catch (e) {
      if(!args[0]) return message.channel.send(`<:xcross:690880230562201610> Come on, at least specify what item u want to use`);
      message.channel.send(`<:xcross:690880230562201610> What are u doing? I don't think that item is in the shop`);
    } finally {
      console.log(`${message.author.username} used a ${args[0]}`);
    }
  }
  }
});



bot.on("message", async message => {
  
  if (message.author.bot) return;
  let prefix = config.prefix;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let invUser = await inv.findOne({
    userID: message.author.id
  });
  
  if(!invUser){
    invUser = new inv({
      userID: message.author.id,
      username: message.author.tag,
      items: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      lastDaily: 0,
      streak: 0
    });
    await invUser.save().catch(e => console.log(e));
  }

  let messageUser = await Messages.findOne({
    userID: message.author.id
  });
 
  

  if(!messageUser){
    messageUser = new Messages({
      userID: message.author.id,
      username: message.author.tag,
      xp: 0,
      total: 0,
      level: 0,
      cash: 500,
      multiplier: 1,
      uses: 0
    });

    
    await messageUser.save().catch(e => console.log(e));
  }
  await Messages.findOne({
    userID: message.author.id
  }, async (err, saved) => {
    if(err) console.log(err);

    if(saved.uses == 0 && saved.multiplier > 1) saved.multiplier = 1;
  let xp = Math.ceil(Math.random() * 30);
    let prefixxp = Math.ceil(Math.random() * 90);
    saved.xp += xp;
    saved.total += xp;
    if (message.content.startsWith(prefix)) saved.total += prefixxp;
    if (message.content.startsWith(prefix)) saved.xp += prefixxp; 
    
    const targetxp = (saved.level + 1) * 500;
  
  if(targetxp >= saved.xp) return await saved.save().catch(e => console.log(e));;

    saved.xp -= targetxp;
    saved.level += 1;

    let receive = saved.level * 50;
    let lvup = `<@${message.author.id}> just levelled up to level ${saved.level}!\n**+** $${receive}`;
    
    message.channel.send(lvup);
    saved.cash += receive;
    
  
    await saved.save().catch(e => console.log(e));
  });
});

function event(){
  let picker = Math.ceil(Math.random() * 100);
  if(picker < 55) {//common
    let common = ["cguess"];
    let event = common[Math.ceil(Math.random() * (common.length - 1))];
    return event;
  } else if(picker < 75){//uncommon
    return `uncommon event`;
  } else if(picker < 91){//rare
    return `rare event`;
  } else {//super pooper
    return `rarer event`;
  }
}


bot.login("NTc0OTEwODkwMzk5MjM2MTA0.XqjxeA.1zU89O0L3rdDhHSOszHaQUfksbo");

var bannedwords = ["fuck", "slut", "rape", "lolicon", "motherfucker", "loli", "f u c k", "lolli", "fvck", "fuk", "bitch", "lollicon", "lolicom", "porn", "sex"];
let deleteChannels = ['682721467468611634', '682200283714945045', '684399471811231754', '673501879451516940'];
const discord = require("discord.js"); 
const config = require("./config.json");
const items = require("./items.json");
const fs = require("fs");
const recent = new Map();
const active = new Map();
const bot = new discord.Client({ disableEveryone: true });

const mongoose = require('mongoose');
mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Messages = require('./models/messages.js');
const inv = require('./models/inv.js');



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
    `oshit im online`,
    `ㅇㅅㅇ`,
    `Wear a mask!`,
    `DM errors to Aaronlauks`,
    `${config.prefix}help`,
    `Prefix | (${config.prefix})`,
    `Only in ${bot.guilds.size} servers!`,
    `Made by Aaronlauks`,
    `${config.prefix}help <command>`,
    `coronavirus can't hurt me!`
  ];
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {
      type: "STREAMING",
      url: "https://www.twitch.tv/Aaronlauks"
    });
  }, 10000);
  bot.user.setActivity(statuses);
});



bot.on('message', message => { //this event is fired, whenever the bot sees a new message
   if (message.isMemberMentioned(bot.user)) { 
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


bot.on("message", message => {
  if (message.author.bot) return;
  if(deleteChannels.includes(message.channel.id)){
    message.delete();
  }
    if (message.channel.type === "dm") {
    let mc = message.content;
    let mem = message.author;
    const embed = new discord.RichEmbed();
    embed.setAuthor(`${mem.username}: ${mc}`, mem.avatarURL);
    if (mem.id !== "574910890399236104") {
      embed.setColor("#00ff15");
    }
    bot.channels
      .get("673501879451516940")
      .send(embed)
      .catch();
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
  let ops = {
      active: active,
      categories: categories,
      items: items
    }
  
  
  try {
    if(bot.commands.has(cmd)){
      command = bot.commands.get(cmd);
    } else {
      command = bot.commands.get(bot.aliases.get(cmd));
    }
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
  

bot.login(process.env.BOT_TOKEN);

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
    `okie`
  ];
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {
      type: "ONLINE",
      url: "https://www.twitch.tv/AaronBotDiscord"
    });
  }, 10000);
  bot.user.setActivity(statuses);
});



bot.on('message', message => { //this event is fired, whenever the bot sees a new message
   if (message.isMemberMentioned(bot.user) && !message.content.includes(`@everyone`) && !message.content.includes(`@here`)) { 
     message.channel.send(`My prefix is \`${config.prefix}\` so please stop pinging me ;-;`); 
   }
});

let number = 0;
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
      bot.channels.get("673501879451516940").send(embed).catch();
    }
  });
  





//message event
bot.on("message", async message => {
  
  let cooldown = 5000;
  let prefix = config.prefix;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  
  let sender = message.author;
  let args = message.content.slice(prefix.length).trim().split(/ +/g); //args is the inputs after the cmd(a$say | test: |,test)
  let cmd = args.shift().toLowerCase(); //cmd is the command name (a help: help)
  let command;
  if (sender.bot) return;
  if(message.content.startsWith("a say")){
    if (message.author.id !== '488249600264896523' && message.author.id !== '585321122287976449') return message.reply('Only Aaronlauks can use this command!')
    var mc = args.join(" ");
    if (mc == null) return;
    message.delete();
    return message.channel.send(mc);
  }
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
  if(cmd == "use" || cmd == "uses" || cmd == "utilize"){
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
      uses: 0,
      notify: true
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
    
    if(saved.notify) message.channel.send(lvup);
    saved.cash += receive;
    
  
    await saved.save().catch(e => console.log(e));
  });
});

bot.on('messageUpdate', async (oldMessage, newMessage) => {
  if(!oldMessage.content || !newMessage.content || oldMessage.author.bot) return;
  let disableChannel = await disable.findOne({
    channelID: oldMessage.channel.id
  });
  if(!disableChannel){
    disableChannel = new disable({
      channelID: oldMessage.channel.id,
      commandName: [],
      editsOld: [],
      editsNew: [],
      deletes: []
    });
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy; 
  disableChannel.editsOld = [oldMessage.content + "c4acda9b-31e7-4f2d-87ad-aa9d22609fed" + oldMessage.author.avatarURL + "c4acda9b-31e7-4f2d-87ad-aa9d22609fed" + oldMessage.author.tag + "c4acda9b-31e7-4f2d-87ad-aa9d22609fed" + today].concat(disableChannel.editsOld)
  disableChannel.editsNew = [newMessage.content].concat(disableChannel.editsOld);
  await disableChannel.save().catch(e => console.log(e));
});
bot.on("messageDelete", async (messageDelete) => {
  if(!messageDelete.content || messageDelete.author.bot) return;
  let disableChannel = await disable.findOne({
    channelID: messageDelete.channel.id
  });
  if(!disableChannel){
    disableChannel = new disable({
      channelID: messageDelete.channel.id,
      commandName: [],
      editsOld: [],
      editsNew: [],
      deletes: []
    });
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy; 
  disableChannel.deletes = [messageDelete.content + "c4acda9b-31e7-4f2d-87ad-aa9d22609fed" + messageDelete.author.avatarURL + "c4acda9b-31e7-4f2d-87ad-aa9d22609fed" + messageDelete.author.tag + "c4acda9b-31e7-4f2d-87ad-aa9d22609fed" + today].concat(disableChannel.deletes);
  await disableChannel.save().catch(e => console.log(e));
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

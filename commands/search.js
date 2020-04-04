const search = require('yt-search');
const discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {
  
  search(args.join(' '), function(err, res) {
         
    if (err) return message.channel.send(`<:xcross:658850997757804555> Unable to find \`${args.join(' ')}`);
         
    let videos = res.videos.slice(0, 10);
    
    let resp = '';
    console.log(videos[1]);
    for(var i in videos) {
      resp += `\n\n**${parseInt(i)+1}.** ${videos[i].title} **[${videos[i].timestamp}]**`;
    }
    //send embed
    const user = message.mentions.users.first() || message.author;
    const embed = new discord.RichEmbed()
    .setColor('#00ff15')
    .setAuthor(`Requested by ${user.tag}`, user.avatarURL)
    .setTitle(`**Choose a number between** \`1-${videos.length}\``)
    .setFooter(
        `© ${message.guild.me.displayName} | Type cancel to stop the selection!`,
        bot.user.displayAvatarURL
      )
    .setDescription(resp);
    message.channel.send(embed);
    
    //make a filter taht filters numbers
    const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
    
    //if "cancel" found
    const cancel = m => m.content.includes('cancel');
    
    //collect messages after the embed with filter applied
    const collector = message.channel.createMessageCollector(filter);
    
    //filter cancel
    const collect = message.channel.createMessageCollector(cancel);

    //update varaibles
    collector.videos = videos;
    
    
    collect.on('collect', m => {
      message.delete();
      const embedMsg = message.embeds.find(msg => msg.title === `**Choose a number between** \`1-${videos.length}\``);
      return message.channel.send("<:xcross:658850997757804555> Cancelled search selection");
      
    });
    //create a listener event
    collector.once('collect', function(m) {
      let search = true;
      let url = [];
      url.push(this.videos[parseInt(m.content)-1].url);
      console.log(url);
      let commandFile = require('./play.js');
      commandFile.run(bot, message, url, ops, search);
      message.delete();
      
      return;
    });
  });
}

module.exports.config = {
  name: "search",
  description: "Displays a list of music for you to choose from",
  category: "Music",
  usage: "a$search <music>",
  accessableby: "Everyone",
  aliases: ["find", "list", "play"]
}

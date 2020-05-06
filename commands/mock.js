const Discord = require("discord.js");
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

exports.run = async (bot, message, args) => {
    let num = 0;
    if (args.length < 1) {
      fetched = await message.channel.fetchMessages({limit: 2});
      let a = [];
      fetched.forEach(f => {
        num++;
        a.push(f.author.username);
        a.push(f.content.split(/ +/g));
        console.log(f.content);
        if(num == 2){
          if(f.content == "" || f.content == null) return message.channel.send(`<:xcross:690880230562201610> There is no message above you xC`);
          message.channel.send(`${a[3].map(randomizeCase).join(" ")}`);
        }
      });
    } else {
      message.channel.send(args.map(randomizeCase));
    }
}


module.exports.config = {
  name: "mock",
  description: "Does the spongebob chicken mock and makes your words or the previous message LiKe tHiS wHicH iS gAy",
  category: "Fun",
  usage: "a mock <message>",
  accessableby: "Everyone",
  aliases: ["sponge", "spongebob", "chicken"]
}

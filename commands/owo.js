const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    let num = 0;
    if (args.length < 1) {
      fetched = await message.channel.fetchMessages({limit: 2});
      let a = [];
      fetched.forEach(f => {
        num++;
        a.push(f.author.username);
        a.push(f.content.split(/ +/g));
        if(num == 2){
          if(f.content == "" || f.content == null) return message.channel.send(`<:xcross:690880230562201610> There is no message above you xC`);
          message.channel.send(`${owoify(a[3].join(" "))}`);
        }
      });
    } else {
        let content = args.join(" ");
        message.channel.send(owoify(content));
    }
}

function owoify(text){
    let faces = ["OwO", "UwU", "o3o", "x3", ":v", ":0", ";_;", ";-;", "<3333", "OWO", "UWU", ":P", "C:", "◕w◕", "𝙊𝙬𝙊", "(。O⁄ ⁄ω⁄ ⁄ O。)", "(⁄ʘ⁄ ⁄ ω⁄ ⁄ ʘ⁄)♡"];
    let txt = ["mmmm~", "nyea~", "Rawr~", "*nuzzles wuzzles*", "murr~", "*lickies your necky*", "*rubbies your bulgy wolgy*", "kyaa~", "OWO What's this?"]
    text = text.split("o").join("u")
    .split("l").join("w")
    .split("r").join("w")
    .split("O").join("U")
    .split("L").join("W")
    .split("R").join("W")
    .split("the").join("da")
    .split("The").join("Da")
    .split("THE").join("DA")
    text = txt[Math.floor(Math.random() * txt.length)] + " " + text + " " + faces[Math.floor(Math.random() * faces.length)];
    return text;
}

module.exports.config = {
  name: "owo",
  description: "makes your text or the text before you gay OwO",
  category: "Fun",
  usage: "a owo <message>",
  accessableby: "Everyone",
  aliases: ["owoify", "uwu", "0w0"]
}

exports.run = async function (bot, message, args) {
    if (args.length < 1) {
      fetched = await message.channel.fetchMessages({limit: 2});
      let a = [];
      fetched.forEach(f => {
        a.push(f.author.username);
        a.push(f.content.split('').reverse().join(''));
        console.log(f.content);
        if(f.content == "" || f.content == null) return message.channel.send(`<:xcross:690880230562201610> There is no message above you xC`)
      })
      if(a[2] && a[3]){
        message.channel.send(`**${a[2]}:** ${a[3]}`)
      } else return message.channel.send(`<:xcross:690880230562201610> There is no message above you xC`)
    }
    message.channel.send(args.join(' ').split('').reverse().join(''));
}

module.exports.config = {
  name: "reverse",
  description: "Makes the message you type in or the previous message reversed",
  category: "Fun",
  usage: "a reverse <message>",
  accessableby: "Everyone",
  aliases: ["backwards", "rev"]
}

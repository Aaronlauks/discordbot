exports.run = async function (bot, message, args) {
  let num = 0;
    if (args.length < 1) {
      fetched = await message.channel.fetchMessages({limit: 2});
      let a = [];
      fetched.forEach(f => {
        num++;
        a.push(f.author.username);
        a.push(f.content.split('').reverse().join(''));
        if(num == 2){
          if(f.content == "" || f.content == null) return message.channel.send(`<:xcross:690880230562201610> There is no message above you xC`);
          message.channel.send(`${a[3]}`);//**${a[2]}:** FOR USERNAME
        }
      });
    } else {
      message.channel.send(args.join(' ').split('').reverse().join(''));
    }
}

module.exports.config = {
  name: "reverse",
  description: "Makes the message you type in or the previous message reversed",
  category: "Fun",
  usage: "a reverse <message>",
  accessableby: "Everyone",
  aliases: ["backwards", "rev"]
}

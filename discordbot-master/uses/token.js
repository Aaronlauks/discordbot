const inv = require("../models/inv.js"); 

exports.run = async (bot, message, args, ops) => {
  let items = ops.items;
  let invUser = await inv.findOne({
         userID: message.author.id
       });
  invUser.items.splice(items.index.indexOf("token"), 1, invUser.items[items.index.indexOf("token")] -= 1);
  let hot = "<:token:690454183132004402>"
  let win = false;
  console.log(invUser.items[items.index.indexOf("token")] );
  if(args[1] == "t" || args[1] == "tail" || args[1] == "tails") hot = "<:tokenTails:691188929617068122>";
  let coin = Math.round(Math.random());
  let ht = ["<:token:690454183132004402>", "<:tokenTails:691188929617068122>"];
  if(hot == ht[coin]) win = true;
  if(hot == "<:token:690454183132004402>") hot = "heads";
  if(hot == "<:tokenTails:691188929617068122>") hot = "tails";
  if(win) invUser.items.splice(items.index.indexOf("token"), 1, invUser.items[items.index.indexOf("token")] += +2);
  ht = ["<:token:690454183132004402> It lands on heads", "<:tokenTails:691188929617068122> It lands on tails"];
  message.channel.send(`<a:tokenFlip:691187472989683763> You flip a token and bet on ${hot}...`)
    .then((msg)=> {
    setTimeout(function(){
      if(win) msg.edit(`${ht[coin]}! You earned 2 **token** <:token:690454183132004402>`);
      if(!win) msg.edit(`${ht[coin]} :C You got **nothing**!`);
    }, 3000)
  }); 
  await invUser.save().catch(e => console.log(e));
}

module.exports.config = {
  name: "token"
}

const discord = require("discord.js");
const axios = require("axios")
const {code} = require('country-emoji');
const { getCode, getName } = require('country-list');


exports.run = async (bot, message, args) => {
  var i;
  let a = [];
  for(i = 0; i < args.length; i++){
    a.push(args[i].charAt(0).toUpperCase() + args[i].substring(1));
  }
    let Cap = a.join(" ");
    let name = "";
    let code = "";

  let getData = async () => {
      let response = await axios.get(
      "https://pomber.github.io/covid19/timeseries.json"
      );
      let cases = response.data;
      return cases;
    };
    let cases = await getData();

    if(getName(args[0].toUpperCase())){
        name = getName(args[0].toUpperCase());
        code = args[0].toUpperCase();
    } else if(getCode(Cap)){
        name = Cap;
        code = getCode(Cap);
    } else return message.channel.send(`<:xcross:690880230562201610> Enter a valid country name or country code >:C`)
    let active = "";
    console.log(name)
    if(!cases[name]) {
      const embed = new discord.RichEmbed()
      .setTitle(`Click me for more info!`)
      .setURL('https://www.worldometers.info/coronavirus/')
      .setColor('https://www.worldometers.info/coronavirus/')
      .setAuthor(`Sorry, we do not have info for ${name}`, bot.user.displayAvatarURL)
      .setDescription(`We searched far and wide for \`${name}\`\nPlease visit the link if you really want more info about \`${name}\``)
      return message.channel.send(embed)
    } 
    if(((cases[name][cases[name].length - 1].confirmed) - (cases[name][cases[name].length - 1].recovered) - (cases[name][cases[name].length - 1].deaths)) - ((cases[name][cases[name].length - 2].confirmed) - (cases[name][cases[name].length - 2].recovered) - (cases[name][cases[name].length - 2].deaths)) > -1) active = `+${(((cases[name][cases[name].length - 1].confirmed) - (cases[name][cases[name].length - 1].recovered) - (cases[name][cases[name].length - 1].deaths)) - ((cases[name][cases[name].length - 2].confirmed) - (cases[name][cases[name].length - 2].recovered) - (cases[name][cases[name].length - 2].deaths))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    if(((cases[name][cases[name].length - 1].confirmed) - (cases[name][cases[name].length - 1].recovered) - (cases[name][cases[name].length - 1].deaths)) - ((cases[name][cases[name].length - 2].confirmed) - (cases[name][cases[name].length - 2].recovered) - (cases[name][cases[name].length - 2].deaths)) < 0) active = `${(((cases[name][cases[name].length - 1].confirmed) - (cases[name][cases[name].length - 1].recovered) - (cases[name][cases[name].length - 1].deaths)) - ((cases[name][cases[name].length - 2].confirmed) - (cases[name][cases[name].length - 2].recovered) - (cases[name][cases[name].length - 2].deaths))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const embed = new discord.RichEmbed()
    .setTitle(`${name} Covid19 cases`)
    .setFooter(`Last checked`)
    .setTimestamp()
    .addField(`Total cases`, `**${cases[name][cases[name].length - 1].confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** (+${(cases[name][cases[name].length - 1].confirmed) - (cases[name][cases[name].length - 2].confirmed)})`, false)
    .addField('Total deaths', `**${cases[name][cases[name].length - 1].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** (+${(cases[name][cases[name].length - 1].deaths) - (cases[name][cases[name].length - 2].deaths)})`, true)
    .addField('Total recovered', `**${cases[name][cases[name].length - 1].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** (+${(cases[name][cases[name].length - 1].recovered) - (cases[name][cases[name].length - 2].recovered)})`, true)
    .addField('Total active cases', `**${((cases[name][cases[name].length - 1].confirmed) - (cases[name][cases[name].length - 1].recovered) - (cases[name][cases[name].length - 1].deaths)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** (${active})`, true)
    .addField(`Last 24h cases`, `**${cases[name][cases[name].length - 2].confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`, false)
    .addField('Total deaths', `**${cases[name][cases[name].length - 2].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`, true)
    .addField('Total recovered', `**${cases[name][cases[name].length - 2].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`, true)
    .addField('Total active cases', `**${((cases[name][cases[name].length - 2].confirmed) - (cases[name][cases[name].length - 2].recovered) - (cases[name][cases[name].length - 2].deaths)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`, true)
    .setThumbnail(`https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${code.toLowerCase()}.png`);
    message.channel.send(embed)
    }


module.exports.config = {
  name: "covid",
  description: "Shows the data ",
  category: "Miscellaneous",
  usage: "a covid",
  accessableby: "Everyone",
  aliases: ["covid19", "covid-19", "corona", "coronavirus", "virus"]
}
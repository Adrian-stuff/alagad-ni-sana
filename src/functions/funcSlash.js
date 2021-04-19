const Discord = require("discord.js");

module.exports.betterpp = (reply, args, interaction) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Measure your pp:")
    .setColor(15406156);
  const body = `    ▐░░░░░░░░░░░▌\n`.repeat(Math.floor(Math.random() * 11));
  embed.setDescription(
    `${
      args === undefined
        ? `${args.user}`
        : `${interaction.member.user.username}`
    }'s pp:\n` +
      "```        ▄▄ ▄▄\n      ▄▌▒▒▀▒▒▐▄\n     ▐▒▒▒▒▒▒▒▒▒▌\n    ▐▒▒▒▒▒▒▒▒▒▒▒▌\n    ▐▒▒▒▒▒▒▒▒▒▒▒▌\n    ▐▀▄▄▄▄▄▄▄▄▄▀▌\n" +
      body +
      "   ▄█▓░░░░░░░░░▓█▄\n  ▄▀░░░░░░░░░░░░░ ▀▄\n ▐░░░░░░░▀▄▒▄▀░░░░░░▌\n▐░░░░░░░▒▒▐▒▒░░░░░░░▌\n▐▒░░░░░▒▒▒▐▒▒▒░░░░░▒▌\n ▀▄▒▒▒▒▒▄▀▒▀▄▒▒▒▒▒▄▀\n   ▀▀▀▀▀     ▀▀▀▀▀```"
  );
  reply(interaction, embed);
};

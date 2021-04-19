const fetch = require("node-fetch");

module.exports.qoute = async (handler, args) => {
  await fetch("https://api.quotable.io/random")
    .then((res) => {
      if (!res.ok) {
        throw res.statusText;
      }
      return res.json();
    })
    .then((data) => {
      handler.channel.send(`*${data.content}*\n - ${data.author}`);
    })
    .catch(() => {
      handler.channel.send("lol sira server ulitin nalang mamaya kbye");
    });
};

module.exports.yesno = (handler, args) => {
  const result = Math.floor(Math.random() * 11) % 2 === 0 ? "Yes" : "No";
  if (!args.length) {
    return `bobo amputa walang tanong pano ko yan masasagot ha?, ${handler.author}!`;
  }
  const question = args.toString().replace(/,/g, " ");
  return `${
    handler.author ? `${handler.author}` : `<@!${handler.member.user.id}>`
  } "${question}" \n **${result}** `;
};

module.exports.meme = async (handler, args) => {
  await fetch(`https://meme-api.herokuapp.com/gimme/${args}`)
    .then((res) => {
      if (!res.ok) {
        throw res.statusText();
      }
      return res.json();
    })
    .then((data) => {
      const memeEmbed = {
        color: 0x0099ff,
        title: data.title,
        url: data.postLink,
        author: {
          name: `u/${data.author}`,
          url: `https://reddit.com/user/${data.author}`,
        },
        thumbnail: {
          url: data.preview[1],
        },
        image: {
          url: data.url,
        },
      };

      handler.channel.send({ embed: memeEmbed });
    })
    .catch(() => {
      handler.channel.send(
        `sure kaba na tama yung subreddit mo ha? ${handler.author}`
      );
    });
};
module.exports.betterTite = (handler) => {
  const body = `    ▐░░░░░░░░░░░▌\n`.repeat(Math.floor(Math.random() * 11));
  const taggedUser = handler.mentions.users.first();
  const titeEmbed = {
    title: "**Measure your pp:**",
    description:
      `${taggedUser ? taggedUser.username : handler.author.username}'s pp:\n` +
      "```        ▄▄ ▄▄\n      ▄▌▒▒▀▒▒▐▄\n     ▐▒▒▒▒▒▒▒▒▒▌\n    ▐▒▒▒▒▒▒▒▒▒▒▒▌\n    ▐▒▒▒▒▒▒▒▒▒▒▒▌\n    ▐▀▄▄▄▄▄▄▄▄▄▀▌\n" +
      body +
      "   ▄█▓░░░░░░░░░▓█▄\n  ▄▀░░░░░░░░░░░░░ ▀▄\n ▐░░░░░░░▀▄▒▄▀░░░░░░▌\n▐░░░░░░░▒▒▐▒▒░░░░░░░▌\n▐▒░░░░░▒▒▒▐▒▒▒░░░░░▒▌\n ▀▄▒▒▒▒▒▄▀▒▀▄▒▒▒▒▒▄▀\n   ▀▀▀▀▀     ▀▀▀▀▀```",
    color: 15406156,
  };
  handler.channel.send({ embed: titeEmbed });
};

module.exports.tite = (handler) => {
  const body = `     | |\n`.repeat(Math.floor(Math.random() * 11));
  const taggedUser = handler.mentions.users.first();
  const titeEmbed = {
    title: "**Measure your pp:**",
    description:
      `${taggedUser ? taggedUser.username : handler.author.username}'s pp:\n` +
      "```     /'\\\n" +
      body +
      "    \\_|_/```",
    color: 15406156,
  };
  handler.channel.send({ embed: titeEmbed });
};

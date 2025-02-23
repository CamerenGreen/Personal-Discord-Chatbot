const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "temp-key",
});

const openai = new OpenAIApi(configuration);

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!'); 
});

client.on("messageCreate", async (msg) => {
    if(msg.author.bot) return

    if(!msg.mentions.has(client.user)) return

    msg.content = msg.content.replace(/<@\d+>/g,"")

    const completion = await openai. createCompletion({
        model: "text-davinci-003",
        prompt: msg.content,
    });
    console.log(completion.data.choices[0].text);

    msg.reply(completion.data.choices[0]. text);
})

client.login("temp-token");

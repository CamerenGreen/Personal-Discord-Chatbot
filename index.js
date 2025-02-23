const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: "enter your openai api key here",
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!'); // logged in console to show that its on and working
});

client.on("messageCreate", async (msg) => {
    if(msg.author.bot) return
    // we don't want to reply to ourselves(bot) or other bots
    if(!msg.mentions.has(client.user)) return

    msg.content = msg.content.replace(/<@\d+>/g,"")

    let response = await msg.reply("Generating response...") // responses could take a while, so we let the user know we're working on it as this placeholder

    const completion = await openai. createCompletion({
        model: "text-davinci-003",
        prompt: msg.content, // The prompt for the completion
        maxTokens: 100, // The maximum number of tokens to generate, increased from default 16
        user: msg.author.id.toString(), // This is used to keep the conversation in the same context per user
    });

    response.edit(completion.data.choices[0]. text); // when response is ready, replace the placeholder with the actual response
})

client.login("enter your discord bot token here");

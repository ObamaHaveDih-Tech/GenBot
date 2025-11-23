const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const cooldowns = new Map();

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content === "!ping") {
        message.reply("Pong!");
    }
    if (message.content.startsWith("!say ")) {
        const text = message.content.slice(5);
        if (text) {
            message.channel.send(text);
        }
    }
    if (message.content === "!generate contentkeeper") {
        const now = Date.now();
        const cooldownAmount = 30 * 1000;
        
        if (cooldowns.has(message.author.id)) {
            const expirationTime = cooldowns.get(message.author.id) + cooldownAmount;
            
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before using this command again.`);
            }
        }
        
        const links = [
            "https://edu.ilsatimisoara.ro",
            "https://manual.manutec.co/",
            "https://learn.ham-tetra.es/",
            "https://595urijfiffj.antrak.org.tr/",
            "https://skra.morrisis.com/",
            "https://trackstar.treckstar.net",
            "https://wildcard.katakanachart.com",
            "https://wildcard.oaklandscioly.org",
            "https://Luminal.riversideacademy.site",
            "https://sakura.bostoncareercounselor.com/"
        ];
        const randomLink = links[Math.floor(Math.random() * links.length)];
        message.channel.send(randomLink);
        
        cooldowns.set(message.author.id, now);
    }
});

client.login(process.env.DISCORD_TOKEN);

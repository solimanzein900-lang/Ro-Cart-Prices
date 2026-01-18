const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
require('dotenv').config();

// Create the bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    if (message.content !== "!prices") return;

    const embed = new EmbedBuilder()
        .setTitle("📦 Game Price Menu")
        .setDescription("Click the button to view the full price list for that game.\n\nWe can also get you any item in any game even if it's not listed.")
        .setColor("#57F287");

    // Row 1: 4 main game buttons
    const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("gag").setLabel("Grow a Garden").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("pvb").setLabel("Plants V Brainrots").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("sab").setLabel("Steal A Brainrot").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("mm2").setLabel("Murder Mystery 2").setStyle(ButtonStyle.Success)
    );

    // Row 2: 2 extra game buttons
    const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("bladeball").setLabel("Blade Ball").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("petsim99").setLabel("Pet Simulator 99").setStyle(ButtonStyle.Success)
    );

    await message.channel.send({ embeds: [embed], components: [row1, row2] });
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    const priceLists = {
        gag: `## Grow a garden updated market!!

🎁 Cheapest Pets on the market
🛒 Fast and Reliable Delivery

> <:headlesshorseman:1427271915940347904> Headless Horseman = 4$ USD or 1500 <:robux:1451660351643844691>
<:elephant:143501679924137178> Elephant = $5 USD or 1800 <:robux:1451660351643844691>
<:tiger:1427271972647338006> Tiger = 4$ USD or 1100 <:robux:1451660351643844691>
<:goldengoose:1420149676111433788> Golden Goose = 4$ USD or 1100 <:robux:1451660351643844691>
<:lobster:1420175961156096051> Lobster Thermidor = 4$ USD or 1100 <:robux:1451660351643844691>
<:fff:1420164117309952070> French Fry Ferret = 4$ USD or 1100 <:robux:1451660351643844691>
<:corruptedkitsune:1419962813337833552> Corrupted Kitsune = 4$ USD or 1100 <:robux:1451660351643844691>
<:Kitsune:1419961957251022929> Kitsune = 15$ USD or 5000 <:robux:1451660351643844691>
<:spino:1420369485667242015> Spinosaurus = 7$ USD or 2000 <:robux:1451660351643844691>
<:fennec_fox:1419960193252458606> Fennec Fox = 7$ USD or 2000 <:robux:1451660351643844691>
<:gag_mimicoctopus:1419966427632369755> Mimic Octopus = 5$ USD or 1500 <:robux:1451660351643844691>
<:Disco:1419962897572040764> Disco Bee = 8$ USD or 2800 <:robux:1451660351643844691>
<:Butterfly:1419962996884639785> Butterfly = 7$ USD or 2000 <:robux:1451660351643844691>
<:gag_queenbee:1419966294534393917> Queen Bee = 4$ USD or 1100 <:robux:1451660351643844691>
<:Raccoon:1419962353809887254> Raccoon = 10$ USD or 3000 <:robux:1451660351643844691>
<:rubyoctopus:1442183157502972074> Ruby Squid = 4$ USD or 1100 <:robux:1451660351643844691>

🪙 1,000 Tokens = $14 USD
🪙 10,000 Tokens = $100 USD

We can get you any item, just make a ticket and ask for the price
To buy create a ticket <#1434980325142036530>`,

        pvb: `## Plants vs Brainrots updated market!!

🎁 Cheapest Pets on the market
🛒 Fast and Reliable Delivery

<:kinglimone:1430263097196675072> 3 King Limone - $1 USD 
<:kinglimone:1430263097196675072> 15 King Limone - $4 USD 
<:kinglimone:1430263097196675072> 50 King Limone - $10 USD 
💠 Random DPS

<:trollmango:1435008353783775374> Troll Mango - $10 USD
🥑 Avocado - $17 USD
🌺 Glacial Lily - $10 USD

🌲 100k-200k DPS Plant - $3 USD
🌲 300k-400k DPS Plant - $5 USD
🌲 8-11M DPS Plant - $15 USD

We can get you any item in-game - just create a ticket and ask for the price
Create a ticket <#1434980325142036530> to buy`,

        sab: `## Steal A Brainrot updated market!!!

🛒 Fast and Reliable Delivery
🔗 200+ proofs & vouches

Strawberry Elephant = $900 USD
Meowl = $690 USD
Dragon Cannelloni = $95 USD
Garama & Madundung = $25 USD
Burguro & Fryuro = $30 USD
Ketupat Kepat = $11 USD
Ketchuru & Musturu = $12 USD
Esok Sekolah = $6 USD
Orcaledon = $6 USD
La Secret = $17 USD
Reinito Sleighito = $25 USD
Cooki & Milki = $32 USD
Fragrama & Chocrama = $30 USD
Los Puggies = $6 USD
Money Reindeer = $5 USD
Spaghetti Tualetti = $12 USD
Spooky & Pumpky = $24 USD

We can get you any brainrot even if it's not listed - just create a ticket and ask for the price`,

        mm2: `## Murder Mystery 2 updated market!!!

🛒 Fast and Reliable Delivery
🔗 200+ Proofs and Vouches

Gingerscope = $198 USD
Traveler's Set = $170 USD
Luger = $5 USD
Celestial Set = $70 USD
Bauble = $19 USD
Candy = $7 USD
IceBreaker = $7 USD
Heartblade = $6 USD
Watergun = $6 USD
IcePiercer = $11 USD
Harvester = $12 USD
Dark Set = $32 USD
Vampire Set = $40 USD
Rainbow Set = $12 USD
Sakura Set = $30 USD
Borealis Set = $6 USD
Corrupt = $16 USD
Candleflame = $4 USD
ElderWood Set = $7 USD
Ornament = $2 USD
Bat = $6 USD
Candy Set = $7 USD

We can get you any weapon - just ask for the price. We also sell half sets`,

        bladeball: `## Blade Ball updated market!!!
🛒 Fast and Reliable Delivery 
🔗 200+ Proofs and Vouches

__🪙Tokens__
1K+ Tokens = $7.5/1k
10K+ Tokens = $6/1k
100K+ Tokens = $5/1k

We can get you any amount of tokens, create a ticket and select the amount you need`,

        petsim99: `## Pet Simulator 99 updated market!!!
🛒 Fast and Reliable Delivery
🔗 200+ Proofs and Vouches

__💎Gems__
1B+ Gems = $4/1b 
10B+ Gems = $3/1b
100B+ Gems = $2.5/1b

__🐶Titanics__
Titanics = $3.5/1b RAP (Random Titanics)

We can get you any amount of gems or RAP, create a ticket and select the amount you need`
    };

    await interaction.reply({ content: priceLists[interaction.customId], ephemeral: true });
});

client.login(process.env.TOKEN);

// Error handlers (added only)
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

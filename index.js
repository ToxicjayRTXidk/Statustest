const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Discord client with all intents
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]),
});

// Set up Express server
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

// Status messages array
const statusMessages = [
  "WATCHING Greenville Roleplay Complex"
];

let currentIndex = 0;
const channelId = 'YOUR_CHANNEL_ID_HERE'; // Set this to your channel ID

// Login function
async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

// Function to update status and send messages
function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Watching }],
    status: 'dnd',
  }).catch(console.error);

  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${currentStatus}`).catch(console.error);
  } else {
    console.log('Text channel not found or invalid.');
  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000); // Adjust the interval as needed
});

// Start the bot
login();

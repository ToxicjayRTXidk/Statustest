const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');

// Initialize Discord client with all intents
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]),
});

// Set up Express server
const app = express();
const port = 3000;

// Simple endpoint to confirm server status
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});

// Start the Express server
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

// Array of status messages for the bot
const statusMessages = [
  "WATCHING Greenville Roleplay Complex"
];

let currentIndex = 0;
const channelId = 'YOUR_CHANNEL_ID_HERE'; // Set this to your channel ID

// Function to log in the bot
async function login() {
  try {
    await client.login(process.env.TTOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

// Function to update the bot's status and send messages to a channel
function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  
  // Update bot's presence/status
  try {
    client.user.setPresence({
      activities: [{ name: currentStatus, type: ActivityType.Watching }],
      status: 'dnd',
    });

    // Get the text channel by ID
    const textChannel = client.channels.cache.get(channelId);

    // Check if the channel is valid and send a message
    if (textChannel instanceof TextChannel) {
      textChannel.send(`Bot status is: ${currentStatus}`).catch(console.error);
    } else {
      console.log('Text channel not found or invalid.');
    }
  } catch (error) {
    console.error('Failed to set presence or send message:', error);
  }

  // Update the index for the next status message
  currentIndex = (currentIndex + 1) % statusMessages.length;
}

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  
  // Update status and send messages immediately upon startup
  updateStatusAndSendMessages();

  // Set an interval to update status and send messages periodically
  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000); // Adjust the interval as needed
});

// Start the bot by logging in
login();

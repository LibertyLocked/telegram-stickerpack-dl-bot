import * as Dotenv from "dotenv";
import * as TelegramBot from "node-telegram-bot-api";
// const TelegramBot = require("node-telegram-bot-api");

// load .env config file
Dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

// bot options
const botOptions = {
  polling: true,
  interval: 1000,
};

const bot = new TelegramBot(BOT_TOKEN as string, botOptions);
console.log("Bot started!");

bot.onText(/\/start/, (msg, match) => {
  bot.sendMessage(msg.chat.id,
    "Welcome to sticker pack download bot\n" +
    "Send me a sticker to get started");
});

bot.on("sticker", (msg: TelegramBot.API.IMessage) => {
  if (!msg.sticker) {
    bot.sendMessage(msg.chat.id, "Error: message does not contain a sticker");
    return;
  }

  bot.getFileLink(msg.sticker.file_id)
    .then((url) => {
      bot.sendMessage(msg.chat.id, "The sticker can be downloaded at: \n" + url);
    });

  bot._request("getStickerSet", { form: { name: msg.sticker.set_name } })
    .then((set: TelegramBot.API.IStickerSet) => {
      bot.sendMessage(msg.chat.id, "The set contains " + set.stickers.length + " stickers");
    });
});

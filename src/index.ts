const Botgram: any = require("botgram");
import * as Dotenv from "dotenv";

// load .env config file
Dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

const bot = new Botgram(BOT_TOKEN);
console.log("Bot started!");

// register chat specific contexts
bot.context({ });

// show help
bot.command("start", (msg: any, reply: any, next: any) => {
  reply.text("Welcome to sticker pack download bot\n" +
    "Send me a sticker to get started");
});

// send a handsome squidward sticker
bot.sticker((msg: any, reply: any, next: any) => {
  // reply.sticker("CAADAQADBwADoUYoEZGZAR-daGHnAg");
  bot.fileGet(msg.file.id, (err: any, f: any) => {
    console.log(f);
    reply.text(bot.fileLink(f.path));
  });
  bot.getStickerSet(msg.set_name, (err: any, result: string[]) => {
    console.log(result.length);
  });
});

import * as TelegramBot from "node-telegram-bot-api";
import { getZippedStickers } from "./stickerpack-zip";

export default (bot: TelegramBot) => async (msg: TelegramBot.API.IMessage) => {
  if (!msg.sticker) {
    bot.sendMessage(msg.chat.id, "Error: message does not contain a sticker");
    return;
  }
  const userSentSticker: TelegramBot.API.ISticker = msg.sticker;

  // spin off some async tasks
  // get the link to download the sticker file
  const taskGetLink = bot.getFileLink(userSentSticker.file_id);
  // get the sticker set
  const taskGetStickerSet: Promise<TelegramBot.API.IStickerSet> = bot._request("getStickerSet",
    { form: { name: userSentSticker.set_name } });

  // send user the download link
  await bot.sendMessage(msg.chat.id, `The sticker can be downloaded at:\n ${await taskGetLink}\n`);

  // show user some info about the sticker pack
  const stickerSet = await taskGetStickerSet;
  await bot.sendMessage(msg.chat.id,
    `The sticker set is ${stickerSet.title} ` +
    `([${stickerSet.name}](https://telegram.me/addstickers/${stickerSet.name})).\n` +
    `Contains ${stickerSet.stickers.length} stickers\n` +
    `<strong>Please wait while I put all the stickers into a zip for you...</strong>`,
    { parse_mode: "HTML" });

  // give user the download link to the zipped sticker pack
  const zipBuffer = await getZippedStickers(bot)(stickerSet.stickers);
  bot.sendDocument(msg.chat.id, zipBuffer, {
    reply_to_message_id: msg.message_id,
  }, {
    filename: `${stickerSet.name}.zip`,
  });

  console.log("zipped and sent", stickerSet.name);
};

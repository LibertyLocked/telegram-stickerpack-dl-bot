import * as fetch from "isomorphic-fetch";
import * as JSZip from "jszip";
import * as TelegramBot from "node-telegram-bot-api";

export const fetchStreamAsync = async (fileURI: string): Promise<ReadableStream> => {
  const resp = await fetch(fileURI);
  if (resp.body === null) {
    throw new Error("body is null when fetching " + fileURI);
  }
  return resp.body;
};

/**
 * Returns a stream buffer of the zipped stickers when resolved
 * @param bot Telegram bot instance
 */
export const getZippedStickersAsync = (bot: TelegramBot) => {
  return async (stickers: TelegramBot.API.ISticker[]): Promise<Buffer> => {
    const zip: JSZip = new JSZip();
    const addToZipTasks = stickers.map((sticker) => {
      // map isn't async
      // this starts a task to put every sticker into the zip
      // and puts the running tasks into tasks array
      return (async () => {
        const fileURI: string = await bot.getFileLink(sticker.file_id);
        const filename = fileURI.slice(fileURI.lastIndexOf("/") + 1);
        const stream = await fetchStreamAsync(fileURI);
        zip.file(filename, stream);
      })();
    });

    // make sure all the stickers are added to zip
    await Promise.all(addToZipTasks);

    // generate the zip
    return zip.generateAsync({ type: "nodebuffer", streamFiles: true });
  };
};

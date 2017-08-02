// /**
//  * Preliminary type definitions for Telegram Bot API
//  * Author: libertylocked
//  * License: MIT
//  */

// interface IMessage {
//   message_id: number;
//   from?: IUser;
//   date: number;
//   chat: IChat;
//   forward_from?: IUser;
//   forward_from_chat?: IChat;
//   forward_from_message_id?: number;
//   forward_date?: number;
//   reply_to_message?: IMessage;
//   edit_date?: number;
//   text?: string;
//   entities?: any;
//   audio?: any;
//   document?: any;
//   game?: any;
//   photo?: IPhotoSize[];
//   sticker?: ISticker;
//   video?: any;
//   voice?: any;
//   video_note?: any;
//   new_chat_members?: IUser[];
//   caption?: string;
//   contact?: any;
//   location?: any;
//   venue?: any;
//   new_chat_member?: IUser;
//   left_chat_member?: IUser;
//   new_chat_title?: string;
//   new_chat_photo?: IPhotoSize[];
//   delete_chat_photo?: true;
//   group_chat_photo?: true;
//   supergroup_chat_created?: true;
//   channel_chat_created?: true;
//   migrate_to_chat_id?: number;
//   migrate_from_chat_id?: number;
//   pinned_message?: IMessage;
//   invoice?: any;
//   successful_payment?: any;
// }

// interface IUser {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code?: string;
// }

// interface IChat {
//   id: number;
//   type: "private" | "group" | "supergroup" | "channel";
//   title?: string;
//   username?: string;
//   first_name?: string;
//   last_name?: string;
//   all_members_are_administrators?: boolean;
//   photo?: any;
//   description?: string;
//   invite_link?: string;
// }

// interface ISticker {
//   file_id: string;
//   width: number;
//   height: number;
//   thumb?: IPhotoSize;
//   emoji?: string;
//   set_name?: string;
//   mask_position?: IMaskPosition;
//   file_size?: number;
// }

// interface IPhotoSize {
//   file_id: string;
//   width: number;
//   height: number;
//   file_size?: number;
// }

// interface IMaskPosition {
//   point: "forehead" | "eyes" | "mouth" | "chin";
//   x_shift: number;
//   y_shift: number;
//   scale: number;
// }
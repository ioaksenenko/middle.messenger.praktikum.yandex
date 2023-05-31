import type { IChat, IUser } from "../../data";
import { currentUserId } from "../../data";
import { last } from "../../helpers";

export const getChatUser = (chat: IChat): IUser | undefined => {
    const lastMessage = last(chat.messages);
    return lastMessage?.sender.id === currentUserId ? lastMessage.sender : lastMessage?.recipient;
};

export const getChatAvatar = (chat: IChat): string | undefined => {
    const user = getChatUser(chat);
    return user?.avatar;
};

export const getChatTitle = (chat: IChat): string => {
    const user = getChatUser(chat);
    return user?.first_name && user?.last_name ? `${user?.first_name} ${user?.last_name}` : "";
};

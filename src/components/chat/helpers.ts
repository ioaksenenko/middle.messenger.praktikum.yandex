import { IChat, currentUserId } from "../../data";
import { last } from "../../helpers";

export const getChatUser = (chat: IChat) => {
    const lastMessage = last(chat.messages);
    return lastMessage?.sender.id === currentUserId ? lastMessage.sender : lastMessage?.recipient;
};

export const getChatAvatar = (chat: IChat) => {
    const user = getChatUser(chat);
    return user?.avatar;
};

export const getChatTitle = (chat: IChat) => {
    const user = getChatUser(chat);
    return `${user?.first_name} ${user?.last_name}`;
};

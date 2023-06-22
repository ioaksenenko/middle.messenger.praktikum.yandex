import type { IChat } from "../../api/chats-api/types";

export interface IMessage {
    id: number;
    user_id: number;
    chat_id: number;
    type: string;
    time: string;
    content: string;
    is_read: boolean;
    file: string | null;
}

export interface IMessageListState {
    activeChat?: IChat;
    messages?: IMessage[];
}

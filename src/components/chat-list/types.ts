import type { IChat } from "../../api/chats-api/types";

export interface IChatListState {
    chats?: IChat[];
    activeChat?: IChat;
}

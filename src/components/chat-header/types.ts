import type { IChat } from "../../api/chats-api/types";
import type { IUser } from "../../api/user-api/types";

export interface IChatHeaderProps {
    chatMenuIsVisible?: boolean;
}

export interface IChatHeaderState {
    activeChat?: IChat;
    selectedUsers?: IUser[];
}

import type { IChat } from "../../api/chats-api/types";
import type { IUser } from "../../api/user-api/types";
import type { IRequestState } from "../../core/store/types";

export interface IChatsPageProps {
    activeChat?: IChat;
    messages?: string[];
    user?: IRequestState<IUser>;
    chats?: IRequestState<IChat[]>;
    chatMenuIsVisible?: boolean;
    selectedUsers?: IUser[];
}

import type { IChat } from "../../api/chats-api/types";

export interface IChatDeletionFormState {
    loading?: boolean;
    errors?: Record<string, string[]>;
    activeChat?: IChat;
}

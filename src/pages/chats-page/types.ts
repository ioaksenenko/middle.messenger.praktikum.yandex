import type { IChat } from "../../data";

export interface IChatsPageProps {
    activeChat?: IChat;
    messages?: string[];
}

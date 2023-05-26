import { IChat } from "../../data";

export interface IChatsPageProps {
    activeChat?: IChat;
    messages?: Array<string>;
};

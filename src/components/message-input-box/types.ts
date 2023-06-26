import type { IComponentProps } from "../../core/component/types";
import type { IChat } from "../../api/chats-api/types";

export interface IMessageInputBoxProps extends IComponentProps {
    message?: string;
}

export interface IMessageInputBoxState {
    activeChat?: IChat;
}

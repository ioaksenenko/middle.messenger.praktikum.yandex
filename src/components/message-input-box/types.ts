import type { IComponentProps } from "../../core/component/types";
import type { IChat } from "../../data";

export interface IMessageInputBoxProps extends IComponentProps {
    activeChat: IChat;
    setActiveChat: (chat: IChat) => void;
}

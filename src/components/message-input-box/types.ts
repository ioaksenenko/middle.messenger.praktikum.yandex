import { IComponentProps } from "../../core/component/types";
import { IChat } from "../../data";

export interface IMessageInputBoxProps extends IComponentProps {
    activeChat: IChat;
    setActiveChat: (chat: IChat) => void;
};

import { IComponentProps } from "../../core/component/types";
import { IChat } from "../../data";

export interface IMessageListProps extends IComponentProps {
    activeChat?: IChat;
};

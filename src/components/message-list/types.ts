import type { IComponentProps } from "../../core/component/types";
import type { IChat } from "../../data";

export interface IMessageListProps extends IComponentProps {
    activeChat?: IChat;
}

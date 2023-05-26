import { IComponentProps } from "../../core/component/types";
import { IChat } from "../../data";

export interface IChatListProps extends Omit<IComponentProps, "children"> {
    activeChat?: IChat;
    setActiveChat?: (chat?: IChat) => void;
}

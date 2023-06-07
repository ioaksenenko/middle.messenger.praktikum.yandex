import type { IComponentProps } from "../../core/component/types";
import type { IChat } from "../../data";

export interface IChatListProps extends Omit<IComponentProps, "children"> {
    activeChat?: IChat;
    setActiveChat?: (chat?: IChat) => void;
}

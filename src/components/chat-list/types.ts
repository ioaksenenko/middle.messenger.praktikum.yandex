import type { IComponentProps } from "../../core/component/types";
import type { IRequestState } from "../../core/store/types";
import type { IChat, TChatList } from "../../api/chats-api/types";

export interface IChatListProps extends Omit<IComponentProps, "children"> {
    activeChat?: IChat;
    setActiveChat?: (chat?: IChat) => void;
    chats?: IRequestState<TChatList>;
}

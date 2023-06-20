import type { IComponentProps } from "../../core/component/types";
import type { IChat } from "../../api/chats-api/types";
import type { IMessage } from "../../data";
import type { IRequestState } from "../../core/store/types";
import type { IUser } from "../../api/user-api/types";

export interface IMessageInputBoxProps extends IComponentProps {
    activeChat: IChat;
    setActiveChat: (chat: IChat) => void;
    messages?: Record<string, IMessage[]>;
    user?: IRequestState<IUser>;
    message?: string;
}

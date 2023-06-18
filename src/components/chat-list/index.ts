import { Component } from "../../core";
import { Chat } from "../chat";
import { connect } from "../../core/store/hocs";

import type { IChatListProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

class ChatList extends Component<IChatListProps> {
    constructor({ id, className, activeChat, setActiveChat }: IChatListProps) {
        super({ id, className, activeChat, setActiveChat });
    }

    protected render(): TComponentOrComponentArray | null | undefined {
        return this.props.chats?.data.map(chat => {
            return new Chat({
                id: chat.id,
                avatar: chat.avatar,
                title: chat.title,
                date: chat.last_message.time,
                message: chat.last_message.content,
                onClick: this.handleChatClick.bind(this),
                active: this.props.activeChat?.id === chat.id
            });
        });
    }

    private handleChatClick(event: MouseEvent): void {
        const element = event.currentTarget as HTMLDivElement;
        const chatId = /\d+/.test(element.id) ? parseInt(element.id) : undefined;
        const chat = chatId ? this.props.chats?.data.find(chat => chat.id === chatId) : undefined;
        this.props.setActiveChat?.(chat);
    }
}

export default connect<IChatListProps>(state => ({ chats: state.chats }))(ChatList);

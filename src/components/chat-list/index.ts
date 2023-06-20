import { Component } from "../../core";
import { Chat } from "../chat";
import socket from "../../core/socket";

import type { IChatListProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

class ChatList extends Component<IChatListProps> {
    constructor({ id, className, activeChat, setActiveChat, chats }: IChatListProps) {
        super({ id, className, activeChat, setActiveChat, chats });
    }

    protected render(): TComponentOrComponentArray | null | undefined {
        return this.props.chats.map(chat => (
            new Chat({
                id: chat.id,
                avatar: chat.avatar,
                title: chat.title,
                date: chat.last_message?.time,
                message: chat.last_message?.content,
                onClick: this.handleChatClick.bind(this),
                active: this.props.activeChat?.id === chat.id
            })
        ));
    }

    private handleChatClick(event: MouseEvent): void {
        const element = event.currentTarget as HTMLDivElement;
        const chatId = element.dataset.id && /\d+/.test(element.dataset.id) ? parseInt(element.dataset.id) : undefined;
        const chat = chatId ? this.props.chats.find(chat => chat.id === chatId) : undefined;
        this.props.setActiveChat?.(chat);
        chat && socket.connect(chat.id);
    }
}

export default ChatList;

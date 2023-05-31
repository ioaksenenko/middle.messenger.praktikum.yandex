import { Component } from "../../core";
import { chats, currentUserId } from "../../data";
import { Chat } from "../chat";
import { last } from "../../helpers";

import type { IChatListProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class ChatList extends Component<IChatListProps> {
    constructor({ id, className, activeChat, setActiveChat }: IChatListProps) {
        super({ id, className, activeChat, setActiveChat });
    }

    protected render(): TComponentOrComponentArray {
        return chats.filter(chat => chat.source.id === currentUserId).map(chat => {
            const lastMessage = last(chat.messages);
            return new Chat({
                id: chat.id,
                avatar: chat.avatar,
                title: chat.title,
                date: lastMessage?.date,
                message: lastMessage?.message,
                onClick: this.handleChatClick.bind(this),
                active: this.props.activeChat?.id === chat.id
            });
        });
    }

    private handleChatClick(event: MouseEvent): void {
        const element = event.currentTarget as HTMLDivElement;
        const chat = chats.find(chat => chat.id === element.id);
        this.props.setActiveChat?.(chat);
    }
}

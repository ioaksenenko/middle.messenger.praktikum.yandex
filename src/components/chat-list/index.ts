import { Component } from "../../core";
import Chat from "../chat";
import { connect } from "../../core/store/hocs";
import { Box } from "../box";
import socket from "../../core/socket";
import store from "../../core/store";
import { chatsController } from "../../controllers";
import { BoxWidth } from "../box/types";

import type { IChatListState } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

class ChatList extends Component<IChatListState> {
    constructor() {
        super();
        chatsController.getChats();
    }

    protected render(): TComponentOrComponentArray | null | undefined {
        return new Box({
            width: BoxWidth.full,
            children: this.props.chats?.map?.(chat => (
                new Chat({
                    id: chat.id,
                    avatar: chat.avatar,
                    title: chat.title,
                    date: chat.last_message?.time,
                    message: chat.last_message?.content,
                    onClick: this.handleChatClick.bind(this),
                    active: this.props.activeChat?.id === chat.id
                })
            ))
        });
    }

    private handleChatClick(event: MouseEvent): void {
        const element = event.currentTarget as HTMLDivElement;
        const chatId = element.dataset.id && /\d+/.test(element.dataset.id) ? parseInt(element.dataset.id) : undefined;
        const chat = chatId ? this.props.chats?.find(chat => chat.id === chatId) : undefined;
        store.set("chats.activeChat", chat);
        chat && socket.connect(chat.id);
    }
}

export default connect<IChatListState>(
    store => ({
        chats: store.chats?.data,
        activeChat: store.chats?.activeChat
    })
)(ChatList);

import { Component } from "../../core";
import { Avatar, Box, ChatList, InputBox, Link, Page, User, MessageList } from "../../components";
import { Color, Shape, Size } from "../../types";
import { SearchIcon } from "../../icons";
import { BoxFlexDirection, BoxHeight, BoxWidth } from "../../components/box/types";
import { MessageInputBox } from "../../components/message-input-box";

import type { IChatsPageProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IChat } from "../../data";

export class ChatsPage extends Component<IChatsPageProps> {
    constructor({ activeChat, messages }: IChatsPageProps = {}) {
        super({ activeChat, messages });
    }

    protected render(): TComponentOrComponentArray {
        return new Page({
            flexDirection: BoxFlexDirection.row,
            children: [
                new Box({
                    height: BoxHeight.full,
                    className: "chat-page__sidebar",
                    children: [
                        new User({
                            avatar: new Avatar({
                                size: 36
                            }),
                            children: new Link({
                                href: "/profile/",
                                children: "Иван Аксененко"
                            })
                        }),
                        new InputBox({
                            className: "chat-page__search",
                            size: Size.small,
                            color: Color.primary1,
                            shape: Shape.circular,
                            placeholder: "Поиск",
                            icon: new SearchIcon({
                                fill: Color.primary1
                            })
                        }),
                        new ChatList({
                            activeChat: this.props.activeChat,
                            setActiveChat: this.setActiveChat.bind(this)
                        })
                    ]
                }),
                new Box({
                    height: BoxHeight.full,
                    width: BoxWidth.full,
                    children: [
                        this.props.activeChat && new User({
                            className: "chat-page__user",
                            avatar: new Avatar({
                                src: this.props.activeChat.avatar,
                                size: 36
                            }),
                            children: this.props.activeChat.title
                        }),
                        new MessageList({
                            activeChat: this.props.activeChat
                        }),
                        this.props.activeChat && new MessageInputBox({
                            activeChat: this.props.activeChat,
                            setActiveChat: this.setActiveChat.bind(this)
                        })
                    ]
                })
            ]
        });
    }

    private setActiveChat(chat: IChat): void {
        this.setProps({
            activeChat: chat
        });
    }
}

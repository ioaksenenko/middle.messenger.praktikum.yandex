import { Component } from "../../core";
import { Avatar, Box, ChatList, InputBox, Link, Page, User, MessageList, Button, Typography, modal, Form, ErrorList, UserSearch } from "../../components";
import { Color, Shape, Size } from "../../types";
import { AddIcon, MenuKebabIcon, SearchIcon } from "../../icons";
import { BoxAlignItems, BoxDisplay, BoxFlexDirection, BoxGap, BoxHeight, BoxJustifyContent, BoxOverflow, BoxWidth } from "../../components/box/types";
import { MessageInputBox } from "../../components/message-input-box";
import { connect } from "../../core/store/hocs";
import { chatsController, chatsUsersController, userController } from "../../controllers";
import { makeResourcePath } from "../../helpers/make-resource-path";
import { ButtonView } from "../../components/button/types";

import type { IChatsPageProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IChat } from "../../api/chats-api/types";
import { TypographyTag, TypographyVariant } from "../../components/typography/types";
import store from "../../core/store";

class ChatsPage extends Component<IChatsPageProps> {
    private readonly chatCreationForm = new Form({
        children: [
            this.props.chats?.errors && (
                new ErrorList({ errors: this.props.chats?.errors })
            ),
            new InputBox({
                name: "title",
                label: "Название чата"
            })
        ]
    });

    constructor({ activeChat, messages }: IChatsPageProps = {}) {
        super({ activeChat, messages });
        userController.getUser();
        chatsController.getChats();
    }

    protected render(): TComponentOrComponentArray {
        return new Page({
            flexDirection: BoxFlexDirection.row,
            children: [
                new Box({
                    height: BoxHeight.full,
                    className: "chat-page__sidebar",
                    children: [
                        new Box({
                            width: BoxWidth.full,
                            flexDirection: BoxFlexDirection.row,
                            justifyContent: BoxJustifyContent.spaceBetween,
                            alignItems: BoxAlignItems.center,
                            children: [
                                new User({
                                    avatar: new Avatar({
                                        size: 36,
                                        src: makeResourcePath(this.props.user?.data?.avatar)
                                    }),
                                    children: new Link({
                                        href: "/profile/",
                                        children: this.props.user?.data?.display_name
                                    })
                                }),
                                new Button({
                                    view: ButtonView.ghost,
                                    children: new AddIcon(),
                                    size: Size.small,
                                    className: "chat-page__sidebar__add-button",
                                    onClick: this.onAddChatButtonClick.bind(this)
                                })
                            ]
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
                            setActiveChat: this.setActiveChat.bind(this),
                            chats: this.props.chats?.data ?? []
                        })
                    ]
                }),
                new Box({
                    height: BoxHeight.full,
                    width: BoxWidth.full,
                    children: [
                        this.props.activeChat && new Box({
                            width: BoxWidth.full,
                            flexDirection: BoxFlexDirection.row,
                            justifyContent: BoxJustifyContent.spaceBetween,
                            alignItems: BoxAlignItems.center,
                            overflow: BoxOverflow.visible,
                            className: "chat-page__header",
                            children: [
                                new User({
                                    avatar: new Avatar({
                                        src: this.props.activeChat.avatar,
                                        size: 36
                                    }),
                                    children: this.props.activeChat.title
                                }),
                                new Button({
                                    view: ButtonView.ghost,
                                    size: Size.small,
                                    children: new MenuKebabIcon(),
                                    onClick: this.toggleChatMenuVisible.bind(this)
                                }),
                                new Box({
                                    className: "chat-page__chat-actions",
                                    display: this.props.chatMenuIsVisible ? BoxDisplay.flex : BoxDisplay.none,
                                    children: [
                                        new Button({
                                            view: ButtonView.ghost,
                                            shape: Shape.geometric,
                                            children: "Добавить пользователя",
                                            className: "chat-page__chat-actions__button",
                                            onClick: this.handleAddUserButtonClick.bind(this)
                                        }),
                                        new Button({
                                            view: ButtonView.ghost,
                                            shape: Shape.geometric,
                                            children: "Удалить пользователя",
                                            className: "chat-page__chat-actions__button",
                                            onClick: this.handleDelUserButtonClick.bind(this)
                                        }),
                                        new Button({
                                            view: ButtonView.ghost,
                                            shape: Shape.geometric,
                                            children: "Удалить чат",
                                            className: "chat-page__chat-actions__button",
                                            onClick: this.handleDeleteChatButtonClick.bind(this)
                                        })
                                    ]
                                })
                            ]
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

    private onAddChatButtonClick(): void {
        modal.setProps({
            header: new Typography({
                tag: TypographyTag.h1,
                variant: TypographyVariant.h2,
                children: "Добавление чата"
            }),
            body: this.chatCreationForm,
            footer: new Box({
                justifyContent: BoxJustifyContent.spaceBetween,
                alignItems: BoxAlignItems.center,
                width: BoxWidth.full,
                flexDirection: BoxFlexDirection.row,
                gap: BoxGap.middle,
                children: [
                    new Button({
                        children: "Отмена",
                        onClick: modal.hide.bind(modal),
                        color: Color.primary2,
                        className: "box_width-100"
                    }),
                    new Button({
                        children: "Создать",
                        onClick: this.createChatButtonClick.bind(this),
                        className: "box_width-100"
                    })
                ]
            })
        });
        modal.show();
    }

    private createChatButtonClick(): void {
        const title = this.chatCreationForm.element?.querySelector(`[name="title"]`) as HTMLInputElement;
        if (title) {
            chatsController.createChat({ title: title.value });
            modal.hide();
        }
    }

    private toggleChatMenuVisible(): void {
        this.setProps({
            chatMenuIsVisible: !this.props.chatMenuIsVisible
        });
    }

    private handleDeleteChatButtonClick(): void {
        if (this.props.activeChat) {
            modal.setProps({
                header: new Typography({
                    tag: TypographyTag.h1,
                    variant: TypographyVariant.h2,
                    children: "Удаление чата"
                }),
                body: new Typography({
                    variant: TypographyVariant.bodyM,
                    children: `Вы действительно хотите удалить чат "${this.props.activeChat.title}"?`
                }),
                footer: new Box({
                    justifyContent: BoxJustifyContent.spaceBetween,
                    alignItems: BoxAlignItems.center,
                    width: BoxWidth.full,
                    flexDirection: BoxFlexDirection.row,
                    gap: BoxGap.middle,
                    children: [
                        new Button({
                            children: "Отмена",
                            onClick: modal.hide.bind(modal),
                            color: Color.primary2,
                            className: "box_width-100"
                        }),
                        new Button({
                            children: "Удалить",
                            onClick: this.deleteChat.bind(this),
                            className: "box_width-100"
                        })
                    ]
                })
            });
            modal.show();
        }
    }

    private deleteChat(): void {
        if (this.props.activeChat?.id) {
            chatsController.deleteChat({ chatId: this.props.activeChat.id });
            this.setProps({
                activeChat: undefined,
                chatMenuIsVisible: false
            });
            modal.hide();
        }
    }

    private handleAddUserButtonClick(): void {
        store.set("userSearchResults", null);
        modal.setProps({
            header: new Typography({
                tag: TypographyTag.h1,
                variant: TypographyVariant.h2,
                children: "Добавление пользователя"
            }),
            body: new UserSearch({}),
            footer: new Box({
                justifyContent: BoxJustifyContent.spaceBetween,
                alignItems: BoxAlignItems.center,
                width: BoxWidth.full,
                flexDirection: BoxFlexDirection.row,
                gap: BoxGap.middle,
                children: [
                    new Button({
                        children: "Отмена",
                        onClick: modal.hide.bind(modal),
                        color: Color.primary2,
                        className: "box_width-100"
                    }),
                    new Button({
                        children: "Добавить",
                        className: "box_width-100",
                        onClick: this.handleAddUsersInChatButtonClick.bind(this)
                    })
                ]
            })
        });
        modal.show();
    }

    private handleAddUsersInChatButtonClick(): void {
        if (this.props.selectedUsers?.length && this.props.activeChat?.id) {
            chatsUsersController.addUsers({
                users: this.props.selectedUsers.map(user => user.id),
                chatId: this.props.activeChat.id
            });
            modal.hide();
        }
    }

    private handleDelUserButtonClick(): void {
        store.set("userSearchResults", null);
        if (this.props.activeChat?.id) {
            chatsUsersController.getUsers({
                chatId: this.props.activeChat.id
            });
            modal.setProps({
                header: new Typography({
                    tag: TypographyTag.h1,
                    variant: TypographyVariant.h2,
                    children: "Удаление пользователя"
                }),
                body: new UserSearch({}),
                footer: new Box({
                    justifyContent: BoxJustifyContent.spaceBetween,
                    alignItems: BoxAlignItems.center,
                    width: BoxWidth.full,
                    flexDirection: BoxFlexDirection.row,
                    gap: BoxGap.middle,
                    children: [
                        new Button({
                            children: "Отмена",
                            onClick: modal.hide.bind(modal),
                            color: Color.primary2,
                            className: "box_width-100"
                        }),
                        new Button({
                            children: "Удалить",
                            className: "box_width-100",
                            onClick: this.handleDelUsersInChatButtonClick.bind(this)
                        })
                    ]
                })
            });
            modal.show();
        }
    }

    private handleDelUsersInChatButtonClick(): void {
        if (this.props.selectedUsers?.length && this.props.activeChat?.id) {
            chatsUsersController.delUsers({
                users: this.props.selectedUsers.map(user => user.id),
                chatId: this.props.activeChat.id
            });
            modal.hide();
        }
    }
}

export default connect<IChatsPageProps>(store => ({
    user: store.user,
    chats: store.chats,
    selectedUsers: store.userSearchResults?.selectedUsers
}))(ChatsPage);

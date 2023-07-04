import { Component } from "../../core";
import { Box } from "../box";
import { User } from "../user";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { ButtonView } from "../button/types";
import { Size, Shape, Color } from "../../types";
import { MenuKebabIcon } from "../../icons";
import { connect } from "../../core/store/hocs";
import { Typography } from "../typography";
import { TypographyTag, TypographyVariant } from "../typography/types";
import { chatsUsersController } from "../../controllers";
import ChatDeletionForm from "../chat-deletion-form";
import UserSearch from "../user-search";
import modal from "../modal";
import store from "../../core/store";
import {
    BoxWidth,
    BoxFlexDirection,
    BoxJustifyContent,
    BoxAlignItems,
    BoxOverflow,
    BoxDisplay,
    BoxGap
} from "../box/types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IChatHeaderProps, IChatHeaderState } from "./types";
import { makeResourcePath } from "../../helpers/make-resource-path";

class ChatHeader extends Component<IChatHeaderProps & IChatHeaderState> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            width: BoxWidth.full,
            flexDirection: BoxFlexDirection.row,
            justifyContent: BoxJustifyContent.spaceBetween,
            alignItems: BoxAlignItems.center,
            overflow: BoxOverflow.visible,
            className: "chat-page__header",
            display: this.props.activeChat ? BoxDisplay.flex : BoxDisplay.none,
            children: [
                new User({
                    avatar: new Avatar({
                        src: this.props.activeChat?.avatar && makeResourcePath(this.props.activeChat?.avatar),
                        size: 36
                    }),
                    children: this.props.activeChat?.title
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
        });
    }

    private toggleChatMenuVisible(event: MouseEvent): void {
        event.stopPropagation();
        if (!this.props.chatMenuIsVisible) {
            document.addEventListener("click", () => {
                this.setProps({
                    chatMenuIsVisible: false
                });
            }, { once: true });
        }
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
                body: new ChatDeletionForm()
            });
            modal.show();
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
            body: new UserSearch(),
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

export default connect<IChatHeaderState, IChatHeaderProps>(
    store => ({
        activeChat: store.chats?.activeChat,
        selectedUsers: store.userSearchResults?.selectedUsers
    })
)(ChatHeader);

import { Component } from "../../core";
import { IChatsPageProps } from "./types";
import { Avatar, Box, Button, Chat, Form, InputBox, Link, Page, Typography, User } from "../../components";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Color, Shape, Size } from "../../types";
import { AttachmentIcon, ChevronRight, SearchIcon } from "../../icons";
import { TypographyVariant } from "../../components/typography/types";
import { BoxAlignItems, BoxFlexDirection, BoxGap, BoxHeight, BoxJustifyContent, BoxWidth } from "../../components/box/types";
import { ButtonType, ButtonView } from "../../components/button/types";
import template from "./template.hbs";
import { FormMethod } from "../../components/form/types";

export class ChatsPage extends Component<IChatsPageProps> {
    constructor({selected = false, messages}: IChatsPageProps = {}) {
        super({selected, messages}, template);
    }

    protected render(): TComponentOrComponentArray {
        return new Page({
            flexDirection: BoxFlexDirection.row,
            children: [
                new Box({
                    height: BoxHeight.full,
                    className: "chat-page__sidebar",
                    gap: BoxGap.small,
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
                        new Chat({
                            title: "Пользователь 1",
                            date: "18:09",
                            message: "Последнее присланное вам сообщение. Максимум может быть две строки, а потом должно идти троеточие. Ну ка посмотрим, что получилось. Нет, нужно  ещё немного текста. И ещё чуть-чуть.",
                            onClick: this.handleChatClick.bind(this)
                        })
                    ]
                }),
                new Box({
                    height: BoxHeight.full,
                    width: BoxWidth.full,
                    children: [
                        new Box({
                            height: BoxHeight.full,
                            width: BoxWidth.full,
                            alignItems: BoxAlignItems.center,
                            justifyContent: BoxJustifyContent.center,
                            children: this.props.messages ? this.props.messages.map(
                                message => new Box({
                                    children: message
                                })
                            ) : new Typography({
                                variant: TypographyVariant.mega,
                                children: this.props.selected ? "Напишите сообщение, чтобы начать диалог" : "Выберите чат, чтобы отправить сообщение",
                                className: "chat-page__placeholder"
                            })
                        }),
                        this.props.selected && new Box({
                            alignItems: BoxAlignItems.center,
                            justifyContent: BoxJustifyContent.center,
                            flexDirection: BoxFlexDirection.row,
                            gap: BoxGap.small,
                            width: BoxWidth.full,
                            className: "chat-page__message-box",
                            children: [
                                new Button({
                                    children: new AttachmentIcon(),
                                    shape: Shape.circular,
                                    color: Color.primary2,
                                    size: Size.small,
                                    view: ButtonView.ghost
                                }),
                                new Form({
                                    method: FormMethod.post,
                                    className: "chats-page__message-form",
                                    onSubmit: this.handleFormSubmit.bind(this),
                                    children: [
                                        new InputBox({
                                            placeholder: "Сообщение",
                                            name: "message",
                                            shape: Shape.rounded,
                                            required: true
                                        }),
                                        new Button({
                                            children: new ChevronRight({fill: Color.white}),
                                            shape: Shape.circular,
                                            color: Color.primary2,
                                            size: Size.small,
                                            type: ButtonType.submit
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }

    private handleChatClick() {
        this.setProps({
            selected: true
        })
    }

    private handleFormSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const message = formData.get("message") as string;
        message && this.setProps({
            messages: [
                ...(this.props.messages || []),
                message
            ]
        })
    }
}

import { Component } from "../../core";
import { Box } from "../box";
import { BoxAlignItems, BoxJustifyContent, BoxFlexDirection, BoxGap, BoxWidth, BoxOverflow, BoxPadding } from "../box/types";
import { Button } from "../button";
import { AttachmentIcon, ChevronRight } from "../../icons";
import { Shape, Color, Size } from "../../types";
import { ButtonView, ButtonType } from "../button/types";
import { Form } from "../form";
import { FormMethod } from "../form/types";
import { InputBox } from "../input-box";
import { v4 as makeUUID } from "uuid";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IMessageInputBoxProps } from "./types";

export class MessageInputBox extends Component<IMessageInputBoxProps> {
    constructor({ id, className, children, activeChat, setActiveChat }: IMessageInputBoxProps) {
        super({ id, className, children, activeChat, setActiveChat });
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            flexDirection: BoxFlexDirection.row,
            gap: BoxGap.small,
            width: BoxWidth.full,
            overflow: BoxOverflow.hidden,
            padding: BoxPadding.small,
            className: "message-input-box",
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
                    className: "message-input-box__form",
                    onSubmit: this.handleFormSubmit.bind(this),
                    children: [
                        new InputBox({
                            className: "message-input-box__form__input",
                            placeholder: "Сообщение",
                            name: "message",
                            shape: Shape.rounded,
                            required: true
                        }),
                        new Button({
                            children: new ChevronRight({ fill: Color.white }),
                            shape: Shape.circular,
                            color: Color.primary2,
                            size: Size.small,
                            type: ButtonType.submit
                        })
                    ]
                })
            ]
        });
    }

    private handleFormSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const message = formData.get("message") as string;
        message && this.props.setActiveChat({
            ...this.props.activeChat,
            messages: [
                ...this.props.activeChat.messages,
                {
                    chatId: this.props.activeChat.id,
                    id: makeUUID(),
                    sender: this.props.activeChat.source,
                    recipient: this.props.activeChat.target,
                    date: new Date().toISOString(),
                    message
                }
            ]
        });
    }
}

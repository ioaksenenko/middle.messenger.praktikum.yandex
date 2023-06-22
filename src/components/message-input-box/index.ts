import { Component } from "../../core";
import { Box } from "../box";
import { BoxAlignItems, BoxJustifyContent, BoxFlexDirection, BoxGap, BoxWidth, BoxOverflow, BoxPadding, BoxDisplay } from "../box/types";
import { Button } from "../button";
import { AttachmentIcon, ChevronRightIcon } from "../../icons";
import { Shape, Color, Size } from "../../types";
import { ButtonView, ButtonType } from "../button/types";
import { Form } from "../form";
import { FormMethod } from "../form/types";
import { InputBox } from "../input-box";
import { connect } from "../../core/store/hocs";
import socket from "../../core/socket";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IMessageInputBoxProps, IMessageInputBoxState } from "./types";

class MessageInputBox extends Component<IMessageInputBoxProps & IMessageInputBoxState> {
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
            display: this.props.activeChat ? BoxDisplay.flex : BoxDisplay.none,
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
                            required: true,
                            onInput: this.handleInputMessage.bind(this),
                            value: this.props.message
                        }),
                        new Button({
                            children: new ChevronRightIcon({ fill: Color.white }),
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
        message && socket.sendMessage(message);
        this.setProps({
            message: ""
        });
    }

    private handleInputMessage(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        document.addEventListener("keydown", this.handleMessageInputKeydown.bind(this, input.value), { once: true });
    }

    private handleMessageInputKeydown(message: string, event: KeyboardEvent): void {
        if (event.key === "Enter") {
            message && socket.sendMessage(message);
            this.setProps({
                message: ""
            });
        }
    }
}

export default connect<IMessageInputBoxState, IMessageInputBoxProps>(
    store => ({
        activeChat: store.chats?.activeChat
    })
)(MessageInputBox);

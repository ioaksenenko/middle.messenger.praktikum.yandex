import { Component } from "../../core";
import { IMessageListProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Message } from "../message";
import { Box } from "../box";
import { BoxHeight, BoxWidth, BoxAlignItems, BoxJustifyContent, BoxGap } from "../box/types";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";

export class MessageList extends Component<IMessageListProps> {
    constructor({id, className, activeChat}: IMessageListProps) {
        super({id, className, activeChat});
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            height: BoxHeight.full,
            width: BoxWidth.full,
            alignItems: BoxAlignItems.center,
            justifyContent: this.props.activeChat?.messages?.length ? BoxJustifyContent.end : BoxJustifyContent.center,
            gap: BoxGap.small,
            className: "message-list",
            children: this.props.activeChat?.messages?.length ? this.props.activeChat.messages.map(
                message => new Message({
                    id: message.id,
                    children: message.message,
                    date: message.date,
                    sender: message.sender,
                    recipient: message.recipient
                })
            ) : new Typography({
                variant: TypographyVariant.mega,
                children: this.props.activeChat ? "Напишите сообщение, чтобы начать диалог" : "Выберите чат, чтобы отправить сообщение",
                className: "message-list__placeholder"
            })
        });
    }
}

import { Component } from "../../core";
import Message from "../message";
import { Box } from "../box";
import { BoxHeight, BoxWidth, BoxAlignItems, BoxJustifyContent, BoxGap } from "../box/types";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { connect } from "../../core/store/hocs";

import type { IMessageListProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

class MessageList extends Component<IMessageListProps> {
    constructor({ id, className, activeChat }: IMessageListProps) {
        super({ id, className, activeChat });
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            height: BoxHeight.full,
            width: BoxWidth.full,
            alignItems: BoxAlignItems.center,
            justifyContent: this.props.messages?.length ? BoxJustifyContent.end : BoxJustifyContent.center,
            gap: BoxGap.small,
            className: "message-list",
            children: this.props.messages?.length
                ? this.props.messages.map(
                    message => new Message({
                        id: message.id,
                        children: message.content,
                        time: message.time,
                        userId: message.user_id
                    })
                )
                : new Typography({
                    variant: TypographyVariant.mega,
                    children: this.props.activeChat ? "Напишите сообщение, чтобы начать диалог" : "Выберите чат, чтобы отправить сообщение",
                    className: "message-list__placeholder"
                })
        });
    }
}

export default connect<IMessageListProps>(store => ({ messages: store.messages }))(MessageList);

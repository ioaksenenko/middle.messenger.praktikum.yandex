import { Component } from "../../core";
import Message from "../message";
import { Box } from "../box";
import { BoxHeight, BoxWidth, BoxAlignItems, BoxJustifyContent, BoxGap } from "../box/types";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { connect } from "../../core/store/hocs";

import type { IMessageListState } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

class MessageList extends Component<IMessageListState> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            height: BoxHeight.full,
            width: BoxWidth.full,
            alignItems: BoxAlignItems.center,
            justifyContent: this.props.activeChat && this.props.messages?.length ? BoxJustifyContent.end : BoxJustifyContent.center,
            gap: BoxGap.small,
            className: "message-list",
            children: this.props.activeChat
                ? this.props.messages?.length
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
                        children: "Напишите сообщение, чтобы начать диалог",
                        className: "message-list__placeholder"
                    })
                : new Typography({
                    variant: TypographyVariant.mega,
                    children: "Создайте и выберите чат, чтобы отправить сообщение",
                    className: "message-list__placeholder"
                })
        });
    }
}

export default connect<IMessageListState>(
    store => ({
        activeChat: store.chats?.activeChat,
        messages: store.messages
    })
)(MessageList);

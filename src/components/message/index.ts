import { Component } from "../../core";
import { Box } from "../box";
import { classNames } from "../../helpers";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { Color } from "../../types";
import store from "../../core/store";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IMessageProps, IMessageStore } from "./types";

class Message extends Component<IMessageProps & IMessageStore> {
    constructor({ id, className, children, time, userId }: IMessageProps) {
        super({ id, className, children, time, userId });
    }

    protected render(): TComponentOrComponentArray {
        const currentUserId = store.getState().user.data.id;
        return new Box({
            className: classNames("message", this.props.userId === currentUserId ? "message_primary1" : "message_primary2"),
            children: [
                new Typography({
                    color: this.props.userId === currentUserId ? Color.primary1 : Color.primary2,
                    children: this.props.children
                }),
                new Typography({
                    color: this.props.userId === currentUserId ? Color.secondary1 : Color.secondary2,
                    variant: TypographyVariant.caption,
                    children: new Date(this.props.time).toLocaleString("ru-RU", { hour: "numeric", minute: "numeric" })
                })
            ]
        });
    }
}

export default Message;

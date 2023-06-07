import { Component } from "../../core";
import { Box } from "../box";
import { currentUserId } from "../../data";
import { classNames } from "../../helpers";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { Color } from "../../types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IMessageProps } from "./types";

export class Message extends Component<IMessageProps> {
    constructor({ id, className, children, date, sender, recipient }: IMessageProps) {
        super({ id, className, children, date, sender, recipient });
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            className: classNames("message", this.props.sender.id === currentUserId ? "message_primary1" : "message_primary2"),
            children: [
                new Typography({
                    color: this.props.sender.id === currentUserId ? Color.primary1 : Color.primary2,
                    children: this.props.children
                }),
                new Typography({
                    color: this.props.sender.id === currentUserId ? Color.secondary1 : Color.secondary2,
                    variant: TypographyVariant.caption,
                    children: new Date(this.props.date).toLocaleString("ru-RU", { hour: "numeric", minute: "numeric" })
                })
            ]
        });
    }
}

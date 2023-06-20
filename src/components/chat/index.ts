import { Component } from "../../core";
import { Box } from "../box";
import { Avatar } from "../avatar";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { Color } from "../../types";
import { BoxFlexDirection, BoxGap, BoxJustifyContent, BoxPadding, BoxWidth } from "../box/types";
import { classNames } from "../../helpers";

import type { IChatProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Chat extends Component<IChatProps> {
    constructor({ id, className, children, avatar, title, date, message, active, onClick }: IChatProps) {
        super({ id, className, children, avatar, title, date, message, active, onClick });
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            id: this.props.id,
            flexDirection: BoxFlexDirection.row,
            width: BoxWidth.full,
            gap: BoxGap.small,
            padding: BoxPadding.small,
            className: classNames("chat", this.props.active && "chat_active"),
            children: [
                new Avatar({
                    size: 56,
                    src: this.props.avatar,
                    className: "chat__avatar"
                }),
                new Box({
                    gap: BoxGap.xsmall,
                    width: BoxWidth.full,
                    children: [
                        new Box({
                            flexDirection: BoxFlexDirection.row,
                            width: BoxWidth.full,
                            justifyContent: BoxJustifyContent.spaceBetween,
                            children: [
                                new Typography({
                                    variant: TypographyVariant.h4,
                                    color: Color.primary1,
                                    children: this.props.title
                                }),
                                new Typography({
                                    variant: TypographyVariant.caption,
                                    color: Color.secondary1,
                                    children: this.props.date && new Date(this.props.date).toLocaleString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })
                                })
                            ]
                        }),
                        new Box({
                            flexDirection: BoxFlexDirection.row,
                            children: [
                                new Typography({
                                    variant: TypographyVariant.caption,
                                    color: Color.secondary1,
                                    children: this.props.message,
                                    className: "chat__message"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

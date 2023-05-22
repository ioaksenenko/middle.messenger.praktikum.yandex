import { Component } from "../../core";
import { IChatProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Box } from "../box";
import { Avatar } from "../avatar";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { Color } from "../../types";
import { BoxFlexDirection, BoxGap, BoxJustifyContent, BoxWidth } from "../box/types";

export class Chat extends Component<IChatProps> {
    constructor({id, className, children, avatar, title, date, message, onClick}: IChatProps) {
        super({id, className, children, avatar, title, date, message, onClick});
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            flexDirection: BoxFlexDirection.row,
            className: "chat",
            children: [
                new Avatar({
                    size: 56,
                    src: this.props.avatar,
                    className: "chat__avatar"
                }),
                new Box({
                    gap: BoxGap.xsmall,
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
                                    children: this.props.date
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
        })
    }
}

import { Component } from "../../core";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Color } from "../../types";
import { Box } from "../box";
import { BoxAlignItems, BoxFlexDirection, BoxGap, BoxHeight, BoxOverflow, BoxPadding, BoxWidth } from "../box/types";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { IUserProps } from "./types";

export class User extends Component<IUserProps> {
    constructor({id, className, children, avatar}: IUserProps) {
        super({id, className, children, avatar});
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            flexDirection: BoxFlexDirection.row,
            alignItems: BoxAlignItems.center,
            gap: BoxGap.small,
            width: BoxWidth.full,
            padding: BoxPadding.small,
            overflow: BoxOverflow.hidden,
            className: this.props.className,
            children: [
                this.props.avatar,
                this.props.children instanceof Component
                    ? this.props.children
                    : new Typography({
                        variant: TypographyVariant.h3,
                        color: Color.primary1,
                        children: this.props.children
                    })
            ]
        })
    }
}

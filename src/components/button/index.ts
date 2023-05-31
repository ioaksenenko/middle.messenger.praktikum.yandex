import { Component } from "../../core";
import template from "./template.hbs";
import { Typography } from "../typography";
import { TypographyTag, TypographyVariant } from "../typography/types";
import { Color, Shape, Size } from "../../types";
import { ButtonType, ButtonView } from "./types";

import type { IButtonProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Button extends Component<IButtonProps> {
    constructor({
        id,
        className,
        children,
        type = ButtonType.button,
        color = Color.primary1,
        view = ButtonView.primary,
        size = Size.medium,
        shape = Shape.circular,
        onClick
    }: IButtonProps) {
        super({
            id,
            className,
            children,
            type,
            color,
            view,
            size,
            shape,
            onClick
        }, template);
    }

    protected render(): TComponentOrComponentArray {
        return typeof this.props.children === "string"
            ? new Typography({
                tag: TypographyTag.span,
                variant: this.props.size === Size.small
                    ? TypographyVariant.accentS
                    : TypographyVariant.accentM,
                children: this.props.children
            })
            : this.props.children;
    }
}

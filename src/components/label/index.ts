import { Component } from "../../core";
import { ILabelProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Typography } from "../typography";
import { TypographyTag, TypographyVariant } from "../typography/types";
import { Color } from "../../types";

export class Label extends Component<ILabelProps> {
    constructor({
        id,
        className,
        children,
        variant = TypographyVariant.bodyL,
        color = Color.secondary1,
        forId
    }: ILabelProps = {}) {
        super({
            id,
            className,
            children,
            variant,
            color,
            forId
        });
    }

    protected render(): TComponentOrComponentArray {
        return new Typography({
            className: this.props.className,
            children: this.props.children,
            tag: TypographyTag.label,
            variant: this.props.variant,
            color: this.props.color
        })
    }

    protected getAttributes(): Record<string, string> {
        const attrs: Record<string, string> = {};
        if (this.props.forId) {
            attrs.for = this.props.forId;
        }
        return attrs;
    }
}

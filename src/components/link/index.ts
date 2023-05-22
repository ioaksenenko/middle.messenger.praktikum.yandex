import { Component } from "../../core";
import { ILinkProps } from "./types";
import { Typography } from "../typography";
import { TypographyTag, TypographyVariant } from "../typography/types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Color } from "../../types";

export class Link extends Component<ILinkProps> {
    constructor({
        id,
        className,
        children,
        variant = TypographyVariant.bodyL,
        color = Color.primary1,
        href
    }: ILinkProps) {
        super({id, className, children, href, variant, color});
    }

    protected render(): TComponentOrComponentArray {
        return new Typography({
            className: "link",
            children: this.props.children,
            tag: TypographyTag.a,
            variant: this.props.variant,
            color: this.props.color
        });
    }

    protected getAttributes(): Record<string, string> {
        return {
            href: this.props.href
        }
    }
}

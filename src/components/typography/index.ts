import { Component } from "../../core";
import { ITypographyProps, TypographyTag, TypographyVariant } from "./types";
import template from "./template.hbs";
import { Color } from "../../types";

export class Typography extends Component<ITypographyProps> {
    constructor({
        id,
        className,
        children,
        tag = TypographyTag.p,
        variant = TypographyVariant.bodyM,
        color = Color.black
    }: ITypographyProps = {}) {
        super({
            id,
            className,
            tag,
            variant,
            color,
            children
        }, template);
    }
}

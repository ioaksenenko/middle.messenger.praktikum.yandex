import { Component } from "../../core";
import { TypographyTag, TypographyVariant } from "./types";
import template from "./template.hbs";
import { Color } from "../../types";

import type { ITypographyProps } from "./types";

export class Typography extends Component<ITypographyProps> {
    constructor({
        id,
        className,
        children,
        tag = TypographyTag.p,
        variant = TypographyVariant.bodyM,
        color = Color.black,
        onClick
    }: ITypographyProps = {}) {
        super({
            id,
            className,
            tag,
            variant,
            color,
            children,
            onClick
        }, template);
    }
}

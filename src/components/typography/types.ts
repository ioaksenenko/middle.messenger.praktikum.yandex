import type { IComponentProps } from "../../core/component/types";
import type { Color } from "../../types";

export enum TypographyVariant {
    mega = "mega",
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    bodyL = "body-large",
    bodyM = "body-middle",
    caption = "caption",
    description = "description",
    accentXS = "accent-xsmall",
    accentS = "accent-small",
    accentM = "accent-middle",
    accentL = "accent-large"
}

export enum TypographyTag {
    p = "p",
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    span = "span",
    label = "label",
    a = "a"
}

export interface ITypographyProps extends IComponentProps {
    tag?: TypographyTag;
    variant?: TypographyVariant;
    color?: Color;
}

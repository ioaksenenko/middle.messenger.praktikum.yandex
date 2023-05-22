import { IComponentProps } from "../../core/component/types";
import { Color } from "../../types";

export enum TypographyVariant {
    mega = "mega",
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    bodyL = "bodyL",
    bodyM = "bodyM",
    caption = "caption",
    description = "description",
    accentXS = "accentXS",
    accentS = "accentS",
    accentM = "accentM",
    accentL = "accentL"
};

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

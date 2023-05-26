import { IComponentProps } from "../../core/component/types";

export enum BoxTag {
    div = "div",
    header = "header",
    main = "main",
    footer = "footer",
    body = "body"
}

export enum BoxDisplay {
    flex = "flex",
    block = "block"
}

export enum BoxFlexDirection {
    column = "column",
    row = "row"
}

export enum BoxAlignItems {
    start = "start",
    center = "center",
    end = "end"
}

export enum BoxJustifyContent {
    start = "start",
    center = "center",
    end = "end",
    spaceBetween = "space-between"
}

export enum BoxGap {
    xlarge = "xlarge",
    large = "large",
    middle = "middle",
    small = "small",
    xsmall = "xsmall"
}

export enum BoxHeight {
    full = "100",
    auto = "auto"
}

export enum BoxWidth {
    full = "100",
    auto = "auto"
}

export enum BoxPosition {
    static = "static",
    relative = "relative",
    absolute = "absolute",
    sticky = "sticky"
}

export enum BoxPadding {
    xlarge = "xlarge",
    large = "large",
    middle = "middle",
    small = "small",
    xsmall = "xsmall"
}

export enum BoxOverflow {
    hidden = "hidden",
    visible = "visible",
    auto = "auto"
}

export interface IBoxProps extends IComponentProps {
    tag?: BoxTag;
    display?: BoxDisplay;
    flexDirection?: BoxFlexDirection;
    alignItems?: BoxAlignItems;
    justifyContent?: BoxJustifyContent;
    gap?: BoxGap;
    height?: BoxHeight;
    width?: BoxWidth;
    position?: BoxPosition;
    padding?: BoxPadding;
    overflow?: BoxOverflow;
};

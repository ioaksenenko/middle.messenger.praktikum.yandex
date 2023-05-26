import { Component } from "../../core";
import { IBoxProps, BoxTag, BoxDisplay, BoxFlexDirection, BoxAlignItems, BoxJustifyContent, BoxHeight, BoxWidth, BoxOverflow } from "./types";
import template from "./template.hbs";

export class Box extends Component<IBoxProps> {
    constructor({
        id,
        className,
        children,
        tag = BoxTag.div,
        display = BoxDisplay.flex,
        flexDirection = BoxFlexDirection.column,
        alignItems = BoxAlignItems.start,
        justifyContent = BoxJustifyContent.start,
        gap,
        height = BoxHeight.auto,
        width = BoxWidth.auto,
        position,
        padding,
        overflow = BoxOverflow.auto
    }: IBoxProps = {}) {
        super({
            id,
            className,
            children,
            tag,
            display,
            flexDirection,
            alignItems,
            justifyContent,
            gap,
            height,
            width,
            position,
            padding,
            overflow
        }, template);
    }
}

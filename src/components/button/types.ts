import { IComponentProps } from "../../core/component/types";
import { Color, TIcon, Shape, Size } from "../../types";

export enum ButtonView {
    primary = "primary",
    outline = "outline",
    ghost = "ghost"
}

export enum ButtonType {
    button = "button",
    submit = "submit"
}

export interface IButtonProps extends IComponentProps {
    type?: ButtonType;
    color?: Color;
    view?: ButtonView;
    size?: Size;
    shape?: Shape;
    onClick?: EventListener;
    children: string | TIcon;
};

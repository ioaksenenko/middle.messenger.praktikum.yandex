import type { IComponentProps } from "../../core/component/types";
import type { Color, Size, Shape } from "../../types";

export enum InputType {
    text = "text",
    password = "password",
    email = "email"
}

export interface IInputProps extends Omit<IComponentProps, "children"> {
    type?: InputType;
    name?: string;
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    onChange?: EventListener;
    onFocus?: EventListener;
    onBlur?: EventListener;
    size?: Size;
    color?: Color;
    shape?: Shape;
    pattern?: string;
    focus?: boolean;
}

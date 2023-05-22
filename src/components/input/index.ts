import { Component } from "../../core";
import { IInputProps, InputType } from "./types";
import template from "./template.hbs";
import { Color, Size, Shape } from "../../types";

export class Input extends Component<IInputProps> {
    constructor({
        id,
        className,
        type = InputType.text,
        name,
        value,
        placeholder = " ",
        readonly,
        required,
        onChange,
        onFocus,
        onBlur,
        size = Size.medium,
        color = Color.black,
        shape = Shape.rounded,
        pattern
    }: IInputProps = {}) {
        super({
            id,
            className,
            type,
            name,
            value,
            placeholder,
            readonly,
            required,
            onChange,
            onFocus,
            onBlur,
            size,
            color,
            shape,
            pattern
        }, template);
    }
}
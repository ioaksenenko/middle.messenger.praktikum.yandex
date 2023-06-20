import { Component } from "../../core";
import { InputType } from "./types";
import template from "./template.hbs";
import { Color, Size, Shape } from "../../types";

import type { IInputProps } from "./types";

export class Input extends Component<IInputProps> {
    constructor({
        id,
        className,
        type = InputType.text,
        name,
        value,
        placeholder,
        readonly,
        required,
        onChange,
        onFocus,
        onBlur,
        onInput,
        size = Size.medium,
        color = Color.black,
        shape = Shape.rounded,
        pattern,
        focus = false
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
            onInput,
            size,
            color,
            shape,
            pattern,
            focus
        }, template);
    }
}

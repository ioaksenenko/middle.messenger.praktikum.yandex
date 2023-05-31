import { Component } from "../../core";
import { Box } from "../box";
import { BoxGap, BoxPosition, BoxWidth } from "../box/types";
import { Input } from "../input";
import { Label } from "../label";
import { classNames } from "../../helpers";
import { Color, IconPosition, Shape, Size } from "../../types";
import { Button } from "../button";
import { ButtonView } from "../button/types";
import { Typography } from "../typography";

import type { IInputBoxProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class InputBox extends Component<IInputBoxProps> {
    constructor({
        id,
        className,
        type,
        name,
        value,
        placeholder,
        readonly,
        required,
        onChange,
        size = Size.medium,
        color = Color.primary1,
        shape = Shape.circular,
        pattern,
        label,
        icon,
        iconPosition = IconPosition.left,
        validationRules,
        error,
        onIconClick,
        isFocused = false
    }: IInputBoxProps = {}) {
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
            size,
            color,
            shape,
            pattern,
            label,
            icon,
            iconPosition,
            validationRules,
            error,
            onIconClick,
            isFocused
        });
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            position: BoxPosition.relative,
            gap: BoxGap.xsmall,
            className: classNames(
                "input-box",
                this.props.className,
                this.props.size && `input-box_size-${this.props.size}`,
                this.props.shape && `input-box_shape-${this.props.shape}`,
                this.props.color && `input-box_color-${this.props.color}`,
                this.props.icon && this.props.iconPosition && `input-box_icon-position-${this.props.iconPosition}`,
                this.props.isFocused && `input-box_focus`,
                this.props.value && `input-box_filled`
            ),
            children: [
                this.props.label && new Label({
                    className: "input-box__label",
                    children: this.props.label
                }),
                new Box({
                    position: BoxPosition.relative,
                    width: BoxWidth.full,
                    children: [
                        new Input({
                            type: this.props.type,
                            name: this.props.name,
                            value: this.props.value,
                            placeholder: this.props.placeholder,
                            readonly: this.props.readonly,
                            required: this.props.required,
                            onChange: this.handleInputChange.bind(this),
                            size: this.props.size,
                            color: this.props.color,
                            shape: this.props.shape,
                            pattern: this.props.pattern,
                            onFocus: this.handleInputFocus.bind(this),
                            onBlur: this.handleInputBlur.bind(this),
                            focus: this.props.isFocused
                        }),
                        this.props.icon && new Button({
                            className: classNames(
                                "input-box__icon-button",
                                this.props.iconPosition && `input-box__icon-button_position-${this.props.iconPosition}`
                            ),
                            children: this.props.icon,
                            shape: Shape.circular,
                            color: this.props.color,
                            view: ButtonView.ghost,
                            onClick: this.props.onIconClick
                        })
                    ]
                }),
                this.props.error && new Typography({
                    color: Color.error,
                    children: this.props.error
                })
            ]
        });
    }

    protected handleInputChange(event: InputEvent): void {
        const target = event.target as HTMLInputElement;
        this.setProps({
            value: target.value
        });
        this.handleInputBlur(event);
    }

    protected handleInputBlur(event: Event): void {
        this.setProps({
            isFocused: false
        });
        const target = event.target as HTMLInputElement;
        if (this.props.validationRules) {
            this.setProps({
                error: undefined
            });
            this.props.validationRules.forEach(rule => {
                const isValid = rule.validate(target.value);
                if (!isValid) {
                    this.setProps({
                        error: rule.error
                    });
                }
            });
        }
    }

    protected handleInputFocus(): void {
        this.setProps({
            isFocused: true
        });
    }
}

import { Component } from "../../core";
import { IInputBoxProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Box } from "../box";
import { BoxGap, BoxPosition } from "../box/types";
import { Input } from "../input";
import { Label } from "../label";
import { classNames } from "../../helpers";
import { Color, IconPosition, Shape, Size } from "../../types";
import { Button } from "../button";
import { ButtonView } from "../button/types";
import { Typography } from "../typography";
import template from "./template.hbs";

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
        onBlur,
        onFocus
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
            onBlur,
            onFocus
        }, template);
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            position: BoxPosition.relative,
            gap: BoxGap.xsmall,
            className: classNames(
                "input-box",
                this.props.className
            ),
            children: [
                this.props.label && new Label({
                    className: "label",
                    children: this.props.label
                }),
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
                    onBlur: this.handleInputBlur.bind(this)
                }),
                this.props.icon && new Button({
                    className: classNames(
                        "icon-box",
                        this.props.iconPosition && `icon-box_position-${this.props.iconPosition}`
                    ),
                    children: this.props.icon,
                    shape: Shape.circular,
                    color: this.props.color,
                    view: ButtonView.ghost
                }),
                this.props.error && new Typography({
                    color: Color.error,
                    children: this.props.error
                })
            ]
        })
    }

    protected handleInputChange(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        this.setProps({
            value: target.value
        });
    }

    protected handleInputBlur(event: Event) {
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
                    })
                }
            })
        }
    }
}

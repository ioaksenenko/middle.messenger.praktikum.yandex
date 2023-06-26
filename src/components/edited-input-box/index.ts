import { Component } from "../../core";
import { Form } from "../form";
import { InputBox } from "../input-box";
import { Color, IconPosition } from "../../types";
import { connect } from "../../core/store/hocs";
import { userController } from "../../controllers";
import { CheckIcon, EditIcon } from "../../icons";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IEditedInputBoxProps, IEditedInputBoxState } from "./types";

class EditedInputBox extends Component<IEditedInputBoxProps & IEditedInputBoxState> {
    constructor({ isEditing, ...props }: IEditedInputBoxProps) {
        super({ ...props });
        if (!this.props.user) {
            userController.getUser();
        }
    }

    protected render(): TComponentOrComponentArray {
        return new Form({
            className: "profile-page__form",
            children: [
                new InputBox({
                    type: this.props.type,
                    name: this.props.name,
                    label: this.props.label,
                    value: this.props.value ?? (this.props.name && this.props.user ? String(this.props.user[this.props.name]) : ""),
                    readonly: !this.props.isEditing,
                    icon: this.props.isEditing ? new CheckIcon() : new EditIcon(),
                    color: this.props.isEditing ? Color.primary2 : this.props.color,
                    onIconClick: this.toggleEditing.bind(this),
                    validationRules: this.props.validationRules,
                    iconPosition: IconPosition.right,
                    onChange: this.handleInputChange.bind(this),
                    onFocus: this.handleInputFocus.bind(this),
                    onBlur: this.handleInputBlur.bind(this),
                    isFocused: this.props.isFocused,
                    error: this.props.error ?? (this.props.name ? this.props.errors?.[this.props.name]?.join("\n") : "")
                })
            ]
        });
    }

    private submitForm(): void {
        if (this.props.user && this.props.name && this.props.value !== this.props.user[this.props.name] && !this.props.error) {
            userController.updateUser({
                ...this.props.user,
                [this.props.name]: typeof this.props.value === "string"
                    ? this.props.value
                    : this.props.name && this.props.user ? String(this.props.user[this.props.name]) : ""
            });
        }
    }

    private toggleEditing(): void {
        if (this.props.isEditing) {
            this.submitForm();
        }
        this.setProps({
            isEditing: !this.props.isEditing
        });
    }

    private handleInputChange(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        this.setProps({
            value: input.value
        });
    }

    private handleInputFocus(): void {
        this.setProps({
            isEditing: true,
            isFocused: true
        });
    }

    private handleInputBlur(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        if (this.props.validationRules) {
            this.setProps({
                error: undefined
            });
            this.props.validationRules.forEach(rule => {
                const isValid = rule.validate(input.value);
                if (!isValid) {
                    this.setProps({
                        error: rule.error
                    });
                }
            });
        }
        this.setProps({
            isEditing: false,
            isFocused: false,
            value: input.value
        });
        this.submitForm();
    }
}

export default connect<IEditedInputBoxState, IEditedInputBoxProps>(
    state => ({
        user: state.user?.data,
        errors: state.user?.errors
    })
)(EditedInputBox);

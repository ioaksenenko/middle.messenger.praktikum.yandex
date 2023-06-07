import { Avatar, Button, Form, InputBox, Page } from "../../components";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { ButtonView } from "../../components/button/types";
import { InputType } from "../../components/input/types";
import { Component } from "../../core";
import { emailValidatorRule, loginValidatorRule, nameValidatorRule, passwordValidatorRule, phoneValidatorRule } from "../../helpers/validators";
import { ArrowLeftIcon, EditIcon, TrashIcon, UploadIcon, CheckIcon } from "../../icons";
import { Color, IconPosition } from "../../types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IProfilePageProps } from "./types";

export class ProfilePage extends Component<IProfilePageProps> {
    constructor() {
        super({
            emailIsEditing: false,
            loginIsEditing: false,
            firstNameIsEditing: false,
            lastNameIsEditing: false,
            phoneIsEditing: false,
            passwordIsEditing: false
        });
    }

    protected render(): TComponentOrComponentArray {
        return new Page({
            justifyContent: BoxJustifyContent.center,
            alignItems: BoxAlignItems.center,
            gap: BoxGap.xlarge,
            children: [
                new Button({
                    children: new ArrowLeftIcon(),
                    view: ButtonView.outline,
                    className: "profile-page__back-button",
                    onClick: this.handleClickBackButton.bind(this)
                }),
                new Avatar({
                    children: [
                        new Button({
                            children: new UploadIcon(),
                            view: ButtonView.ghost,
                            color: Color.white
                        }),
                        new Button({
                            children: new TrashIcon(),
                            view: ButtonView.ghost,
                            color: Color.white
                        })
                    ]
                }),
                new Form({
                    className: "profile-page__form",
                    children: [
                        new InputBox({
                            type: InputType.email,
                            name: "email",
                            label: "Почта",
                            value: "ioaksenenko@gmail.com",
                            readonly: !this.props.emailIsEditing,
                            icon: this.props.emailIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.emailIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleEmailEditing.bind(this),
                            validationRules: [emailValidatorRule()],
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "login",
                            label: "Логин",
                            value: "ioaksenenko",
                            readonly: !this.props.loginIsEditing,
                            icon: this.props.loginIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.loginIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleLoginEditing.bind(this),
                            validationRules: [loginValidatorRule()],
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "first_name",
                            label: "Имя",
                            value: "Иван",
                            readonly: !this.props.firstNameIsEditing,
                            icon: this.props.firstNameIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.firstNameIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleFirstNameEditing.bind(this),
                            validationRules: [nameValidatorRule()],
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "second_name",
                            label: "Фамилия",
                            value: "Аксененко",
                            readonly: !this.props.lastNameIsEditing,
                            icon: this.props.lastNameIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.lastNameIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleLastNameEditing.bind(this),
                            validationRules: [nameValidatorRule()],
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "phone",
                            label: "Телефон",
                            value: "+7 (961) 218-61-43",
                            readonly: !this.props.phoneIsEditing,
                            icon: this.props.phoneIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.phoneIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.togglePhoneEditing.bind(this),
                            validationRules: [phoneValidatorRule()],
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "password",
                            label: "Пароль",
                            value: "qwerty",
                            readonly: !this.props.passwordIsEditing,
                            icon: this.props.passwordIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.passwordIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.togglePasswordEditing.bind(this),
                            validationRules: [passwordValidatorRule()],
                            iconPosition: IconPosition.right
                        })
                    ]
                }),
                new Button({
                    children: "Выход",
                    onClick: this.handleClickLogoutButton.bind(this)
                })
            ]
        });
    }

    private handleClickBackButton(): void {
        document.location.href = "/chats/";
    }

    private handleClickLogoutButton(): void {
        document.location.href = "/login/";
    }

    private toggleEmailEditing(): void {
        this.setProps({
            emailIsEditing: !this.props.emailIsEditing
        });
    }

    private toggleLoginEditing(): void {
        this.setProps({
            loginIsEditing: !this.props.loginIsEditing
        });
    }

    private toggleFirstNameEditing(): void {
        this.setProps({
            firstNameIsEditing: !this.props.firstNameIsEditing
        });
    }

    private toggleLastNameEditing(): void {
        this.setProps({
            lastNameIsEditing: !this.props.lastNameIsEditing
        });
    }

    private togglePhoneEditing(): void {
        this.setProps({
            phoneIsEditing: !this.props.phoneIsEditing
        });
    }

    private togglePasswordEditing(): void {
        this.setProps({
            passwordIsEditing: !this.props.passwordIsEditing
        });
    }
}

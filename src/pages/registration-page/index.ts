import { Component } from "../../core";
import { Page, Typography, Form, InputBox, Button, QuestionLink, ErrorList } from "../../components";
import { TypographyVariant, TypographyTag } from "../../components/typography/types";
import { InputType } from "../../components/input/types";
import { ButtonType } from "../../components/button/types";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { FormMethod } from "../../components/form/types";
import {
    nameValidationRule,
    loginValidationRule,
    emailValidationRule,
    passwordValidationRule,
    phoneValidationRule
} from "../../validation-rules";
import { signUpController } from "../../controllers";
import { connect } from "../../core/store/hocs";

import type { TComponentOrComponentArray } from "../../core/component/types";

interface IRegistrationPageProps {
    formData?: Record<string, string>;
    loading?: boolean;
    errors?: Record<string, string[]>;
}

export class RegistrationPage extends Component<IRegistrationPageProps> {
    protected render(): TComponentOrComponentArray {
        return new Page({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            gap: BoxGap.xlarge,
            children: [
                new Typography({
                    tag: TypographyTag.h1,
                    variant: TypographyVariant.h1,
                    children: "Регистрация"
                }),
                new Form({
                    method: FormMethod.post,
                    className: "registration-form",
                    onSubmit: this.handleFormSubmit.bind(this),
                    children: [
                        new ErrorList({
                            errors: this.props.errors
                        }),
                        new InputBox({
                            type: InputType.email,
                            name: "email",
                            label: "Почта",
                            validationRules: [emailValidationRule],
                            onChange: this.handleInputChange.bind(this),
                            value: this.props.formData?.email
                        }),
                        new InputBox({
                            name: "login",
                            label: "Логин",
                            validationRules: [loginValidationRule],
                            onChange: this.handleInputChange.bind(this),
                            value: this.props.formData?.login
                        }),
                        new InputBox({
                            name: "first_name",
                            label: "Имя",
                            validationRules: [nameValidationRule],
                            onChange: this.handleInputChange.bind(this),
                            value: this.props.formData?.first_name
                        }),
                        new InputBox({
                            name: "second_name",
                            label: "Фамилия",
                            validationRules: [nameValidationRule],
                            onChange: this.handleInputChange.bind(this),
                            value: this.props.formData?.second_name
                        }),
                        new InputBox({
                            name: "phone",
                            label: "Телефон",
                            validationRules: [phoneValidationRule],
                            onChange: this.handleInputChange.bind(this),
                            value: this.props.formData?.phone
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "password",
                            label: "Пароль",
                            validationRules: [passwordValidationRule],
                            onChange: this.handleInputChange.bind(this),
                            value: this.props.formData?.password
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "re_password",
                            label: "Повторите пароль",
                            validationRules: [passwordValidationRule],
                            onChange: this.handleInputChange.bind(this),
                            value: this.props.formData?.re_password
                        }),
                        new Button({
                            type: ButtonType.submit,
                            children: "Зарегистрироваться"
                        })
                    ]
                }),
                new QuestionLink({
                    question: "Уже зарегистированы?",
                    href: "/login/",
                    children: "Войти"
                })
            ]
        });
    }

    private handleFormSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const firstName = formData.get("first_name");
        const secondName = formData.get("second_name");
        const login = formData.get("login");
        const email = formData.get("email");
        const password = formData.get("password");
        const phone = formData.get("phone");
        const data = {
            first_name: typeof firstName === "string" ? firstName : "",
            second_name: typeof secondName === "string" ? secondName : "",
            login: typeof login === "string" ? login : "",
            email: typeof email === "string" ? email : "",
            password: typeof password === "string" ? password : "",
            phone: typeof phone === "string" ? phone : ""
        };
        signUpController.signUp(data);
    }

    private handleInputChange(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        if (input.name) {
            this.setProps({
                formData: {
                    ...(this.props.formData ?? {}),
                    [input.name]: typeof input.value === "string" ? input.value : ""
                }
            });
        }
    }
}

export default connect(state => state.signup)(RegistrationPage);

import { Component } from "../../core";
import { Page, Typography, Form, InputBox, Button, QuestionLink } from "../../components";
import { TypographyVariant } from "../../components/typography/types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { InputType } from "../../components/input/types";
import { TypographyTag } from "../../components/typography/types";
import { ButtonType } from "../../components/button/types";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { FormMethod } from "../../components/form/types";
import {
    emailValidatorRule,
    loginValidatorRule,
    nameValidatorRule,
    passwordValidatorRule,
    phoneValidatorRule
} from "../../helpers/validators";

export class RegistrationPage extends Component {
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
                        new InputBox({
                            type: InputType.email,
                            name: "email",
                            label: "Почта",
                            validationRules: [emailValidatorRule()]
                        }),
                        new InputBox({
                            name: "login",
                            label: "Логин",
                            validationRules: [loginValidatorRule()]
                        }),
                        new InputBox({
                            name: "first_name",
                            label: "Имя",
                            validationRules: [nameValidatorRule()]
                        }),
                        new InputBox({
                            name: "second_name",
                            label: "Фамилия",
                            validationRules: [nameValidatorRule()]
                        }),
                        new InputBox({
                            name: "phone",
                            label: "Телефон",
                            validationRules: [phoneValidatorRule()]
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "password",
                            label: "Пароль",
                            validationRules: [passwordValidatorRule()]
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "re_password",
                            label: "Повторите пароль",
                            validationRules: [passwordValidatorRule()]
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
        })
    }

    private handleFormSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.forEach(
            (value, key) => {
                console.log(key, value)
            }
        );
    }
}

import { Component } from "../../core";
import { Page, Typography, Form, InputBox, Button, QuestionLink } from "../../components";
import { TypographyVariant, TypographyTag } from "../../components/typography/types";
import { InputType } from "../../components/input/types";
import { ButtonType } from "../../components/button/types";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { loginValidatorRule, passwordValidatorRule } from "../../helpers/validators";
import { FormMethod } from "../../components/form/types";

import type { TComponentOrComponentArray } from "../../core/component/types";

export class LoginPage extends Component {
    protected render(): TComponentOrComponentArray {
        return new Page({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            gap: BoxGap.xlarge,
            children: [
                new Typography({
                    tag: TypographyTag.h1,
                    variant: TypographyVariant.h1,
                    children: "Вход"
                }),
                new Form({
                    method: FormMethod.post,
                    className: "login-page__form",
                    onSubmit: this.handleFormSubmit.bind(this),
                    children: [
                        new InputBox({
                            name: "login",
                            label: "Логин",
                            validationRules: [loginValidatorRule()]
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "password",
                            label: "Пароль",
                            validationRules: [passwordValidatorRule()]
                        }),
                        new Button({
                            type: ButtonType.submit,
                            children: "Войти",
                            className: "login-page__submit"
                        })
                    ]
                }),
                new QuestionLink({
                    question: "Ещё не зарегистированы?",
                    href: "/registration/",
                    children: "Зарегистрироваться"
                })
            ]
        });
    }

    private handleFormSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.forEach(
            (value, key) => {
                console.log(key, value);
            }
        );
    }
}

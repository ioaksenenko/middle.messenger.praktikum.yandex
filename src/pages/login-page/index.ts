import { Component } from "../../core";
import { Page, Typography, Form, InputBox, Button, QuestionLink, ErrorList } from "../../components";
import { TypographyVariant, TypographyTag } from "../../components/typography/types";
import { InputType } from "../../components/input/types";
import { ButtonType } from "../../components/button/types";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { FormMethod } from "../../components/form/types";
import { signInController } from "../../controllers";
import { loginValidationRule, passwordValidationRule } from "../../validation-rules";
import { connect } from "../../core/store/hocs";

import type { TComponentOrComponentArray } from "../../core/component/types";

interface ILoginPageProps {
    formData?: Record<string, string>;
    loading?: boolean;
    errors?: Record<string, string[]>;
}

class LoginPage extends Component<ILoginPageProps> {
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
                        new ErrorList({
                            errors: this.props.errors
                        }),
                        new InputBox({
                            name: "login",
                            label: "Логин",
                            validationRules: [loginValidationRule]
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "password",
                            label: "Пароль",
                            validationRules: [passwordValidationRule]
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
        const login = formData.get("login");
        const password = formData.get("password");
        signInController.signIn({
            login: typeof login === "string" ? login : "",
            password: typeof password === "string" ? password : ""
        });
    }
}

export default connect(state => state.signin)(LoginPage);

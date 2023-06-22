import { Component } from "../../core";
import { Form } from "../form";
import { ErrorList } from "../error-list";
import { InputBox } from "../input-box";
import { Button } from "../button";
import { connect } from "../../core/store/hocs";
import { FormMethod } from "../form/types";
import { InputType } from "../input/types";
import { ButtonType } from "../button/types";
import { signInController } from "../../controllers";
import { toCamelCase } from "../../helpers/to-camel-case";
import {
    loginValidationRule,
    passwordValidationRule
} from "../../validation-rules";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { ISignInFormProps, ISignInState } from "./types";

class SignInForm extends Component<ISignInFormProps & ISignInState> {
    constructor({ login, password }: ISignInFormProps) {
        super({ login, password });
    }

    protected render(): TComponentOrComponentArray {
        return new Form({
            method: FormMethod.post,
            className: "sign-in-form",
            onSubmit: this.handleFormSubmit.bind(this),
            children: [
                new ErrorList({
                    errors: this.props.response?.errors
                }),
                new InputBox({
                    name: "login",
                    label: "Логин",
                    validationRules: [loginValidationRule],
                    value: this.props.login
                }),
                new InputBox({
                    type: InputType.password,
                    name: "password",
                    label: "Пароль",
                    validationRules: [passwordValidationRule],
                    value: this.props.password
                }),
                new Button({
                    type: ButtonType.submit,
                    children: "Войти",
                    className: "sign-in-form__submit"
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
        const data = {
            login: typeof login === "string" ? login : "",
            password: typeof password === "string" ? password : ""
        };
        signInController.signIn(data);
        this.setProps(
            Object.fromEntries(
                Object.entries(data).map(
                    ([key, val]) => [toCamelCase(key), val]
                )
            )
        );
    }
}

export default connect<ISignInState, ISignInFormProps>(state => ({ response: state.signin }))(SignInForm);

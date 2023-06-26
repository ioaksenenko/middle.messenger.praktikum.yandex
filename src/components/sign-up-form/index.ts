import { Component } from "../../core";
import { Form } from "../form";
import { ErrorList } from "../error-list";
import { InputBox } from "../input-box";
import { Button } from "../button";
import { connect } from "../../core/store/hocs";
import { FormMethod } from "../form/types";
import { InputType } from "../input/types";
import { ButtonType } from "../button/types";
import { signUpController } from "../../controllers";
import { toCamelCase } from "../../helpers/to-camel-case";
import {
    emailValidationRule,
    loginValidationRule,
    nameValidationRule,
    phoneValidationRule,
    passwordValidationRule
} from "../../validation-rules";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { ISignUpFormProps, ISignUpState } from "./types";

class SignUpForm extends Component<ISignUpFormProps & ISignUpState> {
    constructor({ firstName, secondName, login, email, password, phone }: ISignUpFormProps) {
        super({ firstName, secondName, login, email, password, phone });
    }

    protected render(): TComponentOrComponentArray {
        return new Form({
            method: FormMethod.post,
            className: "sign-up-form",
            onSubmit: this.handleFormSubmit.bind(this),
            children: [
                new ErrorList({
                    errors: this.props.response?.errors
                }),
                new InputBox({
                    name: "first_name",
                    label: "Имя",
                    validationRules: [nameValidationRule],
                    value: this.props.firstName
                }),
                new InputBox({
                    name: "second_name",
                    label: "Фамилия",
                    validationRules: [nameValidationRule],
                    value: this.props.secondName
                }),
                new InputBox({
                    name: "login",
                    label: "Логин",
                    validationRules: [loginValidationRule],
                    value: this.props.login
                }),
                new InputBox({
                    type: InputType.email,
                    name: "email",
                    label: "Почта",
                    validationRules: [emailValidationRule],
                    value: this.props.email
                }),
                new InputBox({
                    type: InputType.password,
                    name: "password",
                    label: "Пароль",
                    validationRules: [passwordValidationRule],
                    value: this.props.password
                }),
                new InputBox({
                    name: "phone",
                    label: "Телефон",
                    validationRules: [phoneValidationRule],
                    value: this.props.phone
                }),
                new Button({
                    type: ButtonType.submit,
                    children: "Зарегистрироваться"
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
        this.setProps(
            Object.fromEntries(
                Object.entries(data).map(
                    ([key, val]) => [toCamelCase(key), val]
                )
            )
        );
    }
}

export default connect<ISignUpState, ISignUpFormProps>(state => ({ response: state.signup }))(SignUpForm);

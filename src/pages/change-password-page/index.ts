import { Component } from "../../core";
import { Page, Typography, Form, InputBox, Button, QuestionLink, ErrorList } from "../../components";
import { TypographyVariant, TypographyTag } from "../../components/typography/types";
import { InputType } from "../../components/input/types";
import { ButtonType } from "../../components/button/types";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { FormMethod } from "../../components/form/types";
import { userPasswordController } from "../../controllers";
import { passwordValidationRule } from "../../validation-rules";
import { connect } from "../../core/store/hocs";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IChangePasswordPageProps } from "./types";

class ChangePasswordPage extends Component<IChangePasswordPageProps> {
    protected render(): TComponentOrComponentArray {
        return new Page({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            gap: BoxGap.xlarge,
            children: [
                new Typography({
                    tag: TypographyTag.h1,
                    variant: TypographyVariant.h1,
                    children: "Изменение пароля"
                }),
                new Form({
                    method: FormMethod.post,
                    className: "change-password-page__form",
                    onSubmit: this.handleFormSubmit.bind(this),
                    children: [
                        new ErrorList({
                            errors: this.props.errors
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "oldPassword",
                            label: "Старый пароль",
                            validationRules: [passwordValidationRule]
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "newPassword",
                            label: "Новый пароль",
                            validationRules: [passwordValidationRule]
                        }),
                        new Button({
                            type: ButtonType.submit,
                            children: "Сохранить",
                            className: "change-password-page__submit"
                        })
                    ]
                }),
                new QuestionLink({
                    question: "Передумали?",
                    href: "/settings",
                    children: "Вернуться на страницу профиля"
                })
            ]
        });
    }

    private handleFormSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const oldPassword = formData.get("oldPassword");
        const newPassword = formData.get("newPassword");
        userPasswordController.update({
            oldPassword: typeof oldPassword === "string" ? oldPassword : "",
            newPassword: typeof newPassword === "string" ? newPassword : ""
        });
    }
}

export default connect(state => state.changePassword)(ChangePasswordPage);

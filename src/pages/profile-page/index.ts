import { Button, Page, Box, QuestionLink, EditedInputBox, EditedAvatar } from "../../components";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { ButtonView } from "../../components/button/types";
import { InputType } from "../../components/input/types";
import { Component } from "../../core";
import { ArrowLeftIcon } from "../../icons";
import { logoutController } from "../../controllers";
import { emailValidationRule, loginValidationRule, nameValidationRule, phoneValidationRule } from "../../validation-rules";
import { Router } from "../../core/router";

import type { TComponentOrComponentArray } from "../../core/component/types";

const router = new Router("#root");

class ProfilePage extends Component {
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
                new EditedAvatar(),
                new Box({
                    gap: BoxGap.middle,
                    children: [
                        new EditedInputBox({
                            type: InputType.email,
                            name: "email",
                            label: "Почта",
                            validationRules: [emailValidationRule]
                        }),
                        new EditedInputBox({
                            name: "login",
                            label: "Логин",
                            validationRules: [loginValidationRule]
                        }),
                        new EditedInputBox({
                            name: "first_name",
                            label: "Имя",
                            validationRules: [nameValidationRule]
                        }),
                        new EditedInputBox({
                            name: "second_name",
                            label: "Фамилия",
                            validationRules: [nameValidationRule]
                        }),
                        new EditedInputBox({
                            name: "phone",
                            label: "Телефон",
                            validationRules: [phoneValidationRule]
                        }),
                        new EditedInputBox({
                            name: "display_name",
                            label: "Имя в чате"
                        })
                    ]
                }),
                new Button({
                    children: "Выход",
                    onClick: this.handleClickLogoutButton.bind(this)
                }),
                new QuestionLink({
                    question: "Надоел пароль?",
                    href: "/change-password",
                    children: "Изменить"
                })
            ]
        });
    }

    private handleClickBackButton(): void {
        router.go("/messenger");
    }

    private handleClickLogoutButton(): void {
        logoutController.logout();
    }
}

export default ProfilePage;

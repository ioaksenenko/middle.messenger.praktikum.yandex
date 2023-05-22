import { Avatar, Button, Form, InputBox, Page } from "../../components";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { ButtonView } from "../../components/button/types";
import { InputType } from "../../components/input/types";
import { Component } from "../../core";
import { TComponentOrComponentArray } from "../../core/component/types";
import { ArrowLeftIcon, EditIcon, TrashIcon, UploadIcon } from "../../icons";
import { Color, IconPosition } from "../../types";

export class ProfilePage extends Component {
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
                            color: Color.white,
                        }),
                        new Button({
                            children: new TrashIcon(),
                            view: ButtonView.ghost,
                            color: Color.white,
                        })
                    ]
                }),
                new Form({
                    children: [
                        new InputBox({
                            type: InputType.email,
                            name: "email",
                            label: "Почта",
                            value: "ioaksenenko@gmail.com",
                            readonly: true,
                            icon: new EditIcon(),
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "login",
                            label: "Логин",
                            value: "ioaksenenko",
                            readonly: true,
                            icon: new EditIcon(),
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "first_name",
                            label: "Имя",
                            value: "Иван",
                            readonly: true,
                            icon: new EditIcon(),
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "second_name",
                            label: "Фамилия",
                            value: "Аксененко",
                            readonly: true,
                            icon: new EditIcon(),
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            name: "phone",
                            label: "Телефон",
                            value: "+7 (961) 218-61-43",
                            readonly: true,
                            icon: new EditIcon(),
                            iconPosition: IconPosition.right
                        }),
                        new InputBox({
                            type: InputType.password,
                            name: "password",
                            label: "Пароль",
                            value: "qwerty",
                            readonly: true,
                            icon: new EditIcon(),
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

    private handleClickBackButton() {
        document.location.href = "/chats/";
    }

    private handleClickLogoutButton() {
        document.location.href = "/login/";
    }
}

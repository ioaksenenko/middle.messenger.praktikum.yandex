import { Avatar, Button, Form, InputBox, Page, ErrorList, modal, Typography, Image, Box, QuestionLink } from "../../components";
import { BoxAlignItems, BoxFlexDirection, BoxGap, BoxHeight, BoxJustifyContent, BoxWidth } from "../../components/box/types";
import { ButtonView } from "../../components/button/types";
import { InputType } from "../../components/input/types";
import { Component } from "../../core";
import { ArrowLeftIcon, EditIcon, CheckIcon } from "../../icons";
import { Color, IconPosition } from "../../types";
import { logoutController, userAvatarController, userController } from "../../controllers";
import { connect } from "../../core/store/hocs";
import { emailValidationRule, loginValidationRule, nameValidationRule, phoneValidationRule } from "../../validation-rules";
import store from "../../core/store";
import { TypographyTag, TypographyVariant } from "../../components/typography/types";
import { HappyAvocado } from "../../images";
import { makeResourcePath } from "../../helpers/make-resource-path";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IProfilePageProps } from "./types";

class ProfilePage extends Component<IProfilePageProps> {
    private newAvatar: File;

    constructor() {
        super({
            emailIsEditing: false,
            loginIsEditing: false,
            firstNameIsEditing: false,
            lastNameIsEditing: false,
            phoneIsEditing: false,
            displayNameIsEditing: false
        });
        userController.getUser();
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
                    src: makeResourcePath(this.props.user?.data?.avatar),
                    children: new Button({
                        children: new EditIcon(),
                        view: ButtonView.ghost,
                        color: Color.white,
                        onClick: this.handleUploadButtonClick.bind(this)
                    })
                }),
                new Form({
                    className: "profile-page__form",
                    children: [
                        new ErrorList({
                            errors: this.props.user?.errors
                        }),
                        new InputBox({
                            type: InputType.email,
                            name: "email",
                            label: "Почта",
                            value: this.props.user?.data?.email,
                            readonly: !this.props.emailIsEditing,
                            icon: this.props.emailIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.emailIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleEmailEditing.bind(this),
                            validationRules: [emailValidationRule],
                            iconPosition: IconPosition.right,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        new InputBox({
                            name: "login",
                            label: "Логин",
                            value: this.props.user?.data?.login,
                            readonly: !this.props.loginIsEditing,
                            icon: this.props.loginIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.loginIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleLoginEditing.bind(this),
                            validationRules: [loginValidationRule],
                            iconPosition: IconPosition.right,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        new InputBox({
                            name: "first_name",
                            label: "Имя",
                            value: this.props.user?.data?.first_name,
                            readonly: !this.props.firstNameIsEditing,
                            icon: this.props.firstNameIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.firstNameIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleFirstNameEditing.bind(this),
                            validationRules: [nameValidationRule],
                            iconPosition: IconPosition.right,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        new InputBox({
                            name: "second_name",
                            label: "Фамилия",
                            value: this.props.user?.data?.second_name,
                            readonly: !this.props.lastNameIsEditing,
                            icon: this.props.lastNameIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.lastNameIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleLastNameEditing.bind(this),
                            validationRules: [nameValidationRule],
                            iconPosition: IconPosition.right,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        new InputBox({
                            name: "phone",
                            label: "Телефон",
                            value: this.props.user?.data?.phone,
                            readonly: !this.props.phoneIsEditing,
                            icon: this.props.phoneIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.phoneIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.togglePhoneEditing.bind(this),
                            validationRules: [phoneValidationRule],
                            iconPosition: IconPosition.right,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        new InputBox({
                            name: "display_name",
                            label: "Имя в чате",
                            value: this.props.user?.data?.display_name,
                            readonly: !this.props.displayNameIsEditing,
                            icon: this.props.displayNameIsEditing ? new CheckIcon() : new EditIcon(),
                            color: this.props.displayNameIsEditing ? Color.primary2 : Color.primary1,
                            onIconClick: this.toggleDisplayNameEditing.bind(this),
                            iconPosition: IconPosition.right,
                            onChange: this.handleInputChange.bind(this)
                        })
                    ]
                }),
                new Button({
                    children: "Выход",
                    onClick: this.handleClickLogoutButton.bind(this)
                }),
                new QuestionLink({
                    question: "Надоел пароль?",
                    href: "/change-password/",
                    children: "Изменить"
                })
            ]
        });
    }

    private handleClickBackButton(): void {
        document.location.href = "/chats/";
    }

    private handleClickLogoutButton(): void {
        logoutController.logout();
    }

    private toggleEmailEditing(): void {
        if (this.props.emailIsEditing) {
            this.sendUpdateRequest();
        }
        this.setProps({
            emailIsEditing: !this.props.emailIsEditing
        });
    }

    private toggleLoginEditing(): void {
        if (this.props.loginIsEditing) {
            this.sendUpdateRequest();
        }
        this.setProps({
            loginIsEditing: !this.props.loginIsEditing
        });
    }

    private toggleFirstNameEditing(): void {
        if (this.props.firstNameIsEditing) {
            this.sendUpdateRequest();
        }
        this.setProps({
            firstNameIsEditing: !this.props.firstNameIsEditing
        });
    }

    private toggleLastNameEditing(): void {
        if (this.props.lastNameIsEditing) {
            this.sendUpdateRequest();
        }
        this.setProps({
            lastNameIsEditing: !this.props.lastNameIsEditing
        });
    }

    private togglePhoneEditing(): void {
        if (this.props.phoneIsEditing) {
            this.sendUpdateRequest();
        }
        this.setProps({
            phoneIsEditing: !this.props.phoneIsEditing
        });
    }

    private toggleDisplayNameEditing(): void {
        if (this.props.displayNameIsEditing) {
            this.sendUpdateRequest();
        }
        this.setProps({
            displayNameIsEditing: !this.props.displayNameIsEditing
        });
    }

    private handleInputChange(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        store.set(`user.data.${input.name}`, input.value);
    }

    private sendUpdateRequest(): void {
        if (this.props.user) {
            userController.updateUser(this.props.user.data);
        }
    }

    private handleUploadButtonClick(): void {
        modal.setProps({
            header: new Typography({
                tag: TypographyTag.h1,
                variant: TypographyVariant.h2,
                children: "Изменение аватарки"
            }),
            body: new Box({
                width: BoxWidth.full,
                height: BoxHeight.full,
                alignItems: BoxAlignItems.center,
                justifyContent: BoxJustifyContent.center,
                children: this.props.user?.data?.avatar
                    ? new Image({
                        src: makeResourcePath(this.props.user.data.avatar),
                        className: "profile-page__avatar",
                        alt: "Avatar"
                    })
                    : new HappyAvocado()
            }),
            footer: new Box({
                justifyContent: BoxJustifyContent.center,
                alignItems: BoxAlignItems.center,
                width: BoxWidth.full,
                children: new Button({
                    children: "Выбрать файл",
                    onClick: this.handleSelectFileButtonClick.bind(this)
                })
            })
        });
        modal.show();
    }

    private handleSelectFileButtonClick(): void {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", this.handleFileChange.bind(this), { once: true });
        input.click();
    }

    private handleFileChange(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.item(0);
        if (file) {
            this.newAvatar = file;
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                modal.setProps({
                    body: new Box({
                        width: BoxWidth.full,
                        height: BoxHeight.full,
                        alignItems: BoxAlignItems.center,
                        justifyContent: BoxJustifyContent.center,
                        children: new Image({
                            src: event.target?.result as string,
                            className: "profile-page__avatar",
                            alt: "Selected image"
                        })
                    }),
                    footer: new Box({
                        justifyContent: BoxJustifyContent.center,
                        width: BoxWidth.full,
                        flexDirection: BoxFlexDirection.row,
                        gap: BoxGap.large,
                        children: [
                            new Button({
                                children: "Выбрать другой файл",
                                onClick: this.handleSelectFileButtonClick.bind(this)
                            }),
                            new Button({
                                children: "Сохранить",
                                onClick: this.handleSaveAvatarButtonClick.bind(this)
                            })
                        ]
                    })
                });
            };
            reader.readAsDataURL(file);
        }
    }

    private handleSaveAvatarButtonClick(): void {
        const formData = new FormData();
        formData.append("avatar", this.newAvatar);
        userAvatarController.updateUserAvatar(formData);
    }
}

export default connect<IProfilePageProps>(state => ({ user: state.user }))(ProfilePage);

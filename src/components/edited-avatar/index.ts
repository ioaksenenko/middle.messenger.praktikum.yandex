import { Component } from "../../core";
import { Avatar } from "../avatar";
import { makeResourcePath } from "../../helpers/make-resource-path";
import { connect } from "../../core/store/hocs";
import { Button } from "../button";
import { EditIcon } from "../../icons";
import { ButtonView } from "../button/types";
import { Color } from "../../types";
import { Typography } from "../typography";
import { TypographyTag, TypographyVariant } from "../typography/types";
import { Box } from "../box";
import { BoxWidth, BoxHeight, BoxAlignItems, BoxJustifyContent, BoxFlexDirection, BoxGap } from "../box/types";
import { HappyAvocado } from "../../images";
import { Image } from "../image";
import { userAvatarController } from "../../controllers";
import modal from "../modal";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IEditedAvatarState } from "./types";

class EditedAvatar extends Component<IEditedAvatarState> {
    private newAvatar: File;

    protected render(): TComponentOrComponentArray {
        return new Avatar({
            src: makeResourcePath(this.props.user?.avatar),
            children: new Button({
                children: new EditIcon(),
                view: ButtonView.ghost,
                color: Color.white,
                onClick: this.handleUploadButtonClick.bind(this)
            })
        });
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
                children: this.props.user?.avatar
                    ? new Image({
                        src: makeResourcePath(this.props.user.avatar),
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
                                onClick: this.handleSelectFileButtonClick.bind(this),
                                color: Color.primary2
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
        modal.hide();
    }
}

export default connect<IEditedAvatarState>(
    state => ({
        user: state.user?.data
    })
)(EditedAvatar);

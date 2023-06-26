import { Component } from "../../core";
import { Box } from "../box";
import { User } from "../user";
import { Avatar } from "../avatar";
import { makeResourcePath } from "../../helpers/make-resource-path";
import { Link } from "../link";
import { getDisplayName } from "../../controllers/user-controller/helpers";
import { Button } from "../button";
import { ButtonView } from "../button/types";
import { AddIcon } from "../../icons";
import { Size } from "../../types";
import { Typography } from "../typography";
import { TypographyTag, TypographyVariant } from "../typography/types";
import ChatCreationForm from "../chat-creation-form";
import modal from "../modal";
import { connect } from "../../core/store/hocs";
import { userController } from "../../controllers";
import {
    BoxWidth,
    BoxFlexDirection,
    BoxJustifyContent,
    BoxAlignItems
} from "../box/types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IChatSidebarHeaderState } from "./types";

class ChatSidebarHeader extends Component<IChatSidebarHeaderState> {
    constructor() {
        super();
        userController.getUser();
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            width: BoxWidth.full,
            flexDirection: BoxFlexDirection.row,
            justifyContent: BoxJustifyContent.spaceBetween,
            alignItems: BoxAlignItems.center,
            children: [
                new User({
                    avatar: new Avatar({
                        size: 36,
                        src: makeResourcePath(this.props.user?.avatar)
                    }),
                    children: new Link({
                        href: "/profile/",
                        children: this.props.user && getDisplayName(this.props.user)
                    })
                }),
                new Button({
                    view: ButtonView.ghost,
                    children: new AddIcon(),
                    size: Size.small,
                    className: "chat-page__sidebar__add-button",
                    onClick: this.onAddChatButtonClick.bind(this)
                })
            ]
        });
    }

    private onAddChatButtonClick(): void {
        modal.setProps({
            header: new Typography({
                tag: TypographyTag.h1,
                variant: TypographyVariant.h2,
                children: "Добавление чата"
            }),
            body: new ChatCreationForm()
        });
        modal.show();
    }
}

export default connect<IChatSidebarHeaderState>(
    store => ({
        user: store.user?.data
    })
)(ChatSidebarHeader);

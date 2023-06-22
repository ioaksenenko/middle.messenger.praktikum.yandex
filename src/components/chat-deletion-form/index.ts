import { Component } from "../../core";
import { Form } from "../form";
import { ErrorList } from "../error-list";
import { Button } from "../button";
import { connect } from "../../core/store/hocs";
import { ButtonType } from "../button/types";
import { chatsController } from "../../controllers";
import { Box } from "../box";
import modal from "../modal";
import { Color } from "../../types";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import store from "../../core/store";
import {
    BoxJustifyContent,
    BoxAlignItems,
    BoxWidth,
    BoxFlexDirection,
    BoxGap
} from "../box/types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IChatDeletionFormState } from "./types";

class ChatDeletionForm extends Component<IChatDeletionFormState> {
    protected render(): TComponentOrComponentArray {
        return new Form({
            onSubmit: this.handleFormSubmit.bind(this),
            children: [
                new ErrorList({
                    errors: this.props.errors
                }),
                new Typography({
                    variant: TypographyVariant.bodyM,
                    children: `Вы действительно хотите удалить чат "${String(this.props.activeChat?.title)}"?`
                }),
                new Box({
                    justifyContent: BoxJustifyContent.spaceBetween,
                    alignItems: BoxAlignItems.center,
                    width: BoxWidth.full,
                    flexDirection: BoxFlexDirection.row,
                    gap: BoxGap.middle,
                    children: [
                        new Button({
                            children: "Отмена",
                            onClick: modal.hide.bind(modal),
                            color: Color.primary2,
                            className: "box_width-100"
                        }),
                        new Button({
                            type: ButtonType.submit,
                            children: "Удалить",
                            className: "box_width-100"
                        })
                    ]
                })
            ]
        });
    }

    private handleFormSubmit(event: SubmitEvent): void {
        event.preventDefault();
        this.props.activeChat && chatsController.deleteChat({
            chatId: this.props.activeChat.id
        });
        store.set("chats.activeChat", null);
    }
}

export default connect<IChatDeletionFormState>(
    state => ({
        loading: state.chats?.loading,
        errors: state.chats?.errors,
        activeChat: state.chats?.activeChat
    })
)(ChatDeletionForm);

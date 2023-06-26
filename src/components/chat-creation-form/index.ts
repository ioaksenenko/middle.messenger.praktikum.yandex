import { Component } from "../../core";
import { Form } from "../form";
import { ErrorList } from "../error-list";
import { InputBox } from "../input-box";
import { Button } from "../button";
import { connect } from "../../core/store/hocs";
import { ButtonType } from "../button/types";
import { chatsController } from "../../controllers";
import { toCamelCase } from "../../helpers/to-camel-case";
import { Box } from "../box";
import modal from "../modal";
import { Color } from "../../types";
import {
    BoxJustifyContent,
    BoxAlignItems,
    BoxWidth,
    BoxFlexDirection,
    BoxGap
} from "../box/types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IChatCreationFormProps, IChatCreationFormState } from "./types";

class ChatCreationForm extends Component<IChatCreationFormProps & IChatCreationFormState> {
    constructor({ title }: IChatCreationFormProps) {
        super({ title });
    }

    protected render(): TComponentOrComponentArray {
        return new Form({
            onSubmit: this.handleFormSubmit.bind(this),
            children: [
                new ErrorList({
                    errors: this.props.response?.errors
                }),
                new InputBox({
                    name: "title",
                    label: "Название чата",
                    value: this.props.title
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
                            children: "Создать",
                            className: "box_width-100"
                        })
                    ]
                })
            ]
        });
    }

    private handleFormSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get("title");
        const data = {
            title: typeof title === "string" ? title : ""
        };
        chatsController.createChat(data);
        this.setProps(
            Object.fromEntries(
                Object.entries(data).map(
                    ([key, val]) => [toCamelCase(key), val]
                )
            )
        );
    }
}

export default connect<IChatCreationFormState, IChatCreationFormProps>(
    state => ({ response: state.chats })
)(ChatCreationForm);

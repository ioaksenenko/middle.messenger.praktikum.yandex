import { Component } from "../../core";
import { Box } from "../box";
import { Button } from "../button";
import { CloseIcon } from "../../icons";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IModalProps } from "./types";
import { Overlay } from "../overlay";
import { ButtonView } from "../button/types";

class Modal extends Component<IModalProps> {
    private overlay: Overlay;

    constructor({ header, body, footer }: IModalProps = {}) {
        super({ header, body, footer });
    }

    protected render(): TComponentOrComponentArray | null {
        this.overlay = new Overlay({
            onClick: this.hide.bind(this)
        });
        return new Box({
            className: "modal",
            children: [
                new Box({
                    className: "modal__header",
                    children: [
                        this.props.header,
                        new Button({
                            children: new CloseIcon(),
                            view: ButtonView.ghost,
                            onClick: this.hide.bind(this)
                        })
                    ]
                }),
                new Box({
                    className: "modal__body",
                    children: this.props.body
                }),
                this.props.footer && new Box({
                    className: "modal__footer",
                    children: this.props.footer
                })
            ]
        });
    }

    public show(): void {
        document.body.appendChild(this.overlay.content);
        document.body.appendChild(this.content);
        document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    }

    public hide(): void {
        if (this.element) {
            this.content = this.element;
        }
        if (this.overlay.element) {
            this.overlay.content = this.overlay.element;
        }
        document.removeEventListener("keydown", this.handleKeyDown.bind(this), false);
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            this.hide();
        }
    }
}

export default new Modal();

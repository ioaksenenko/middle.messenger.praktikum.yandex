import { Component } from "../../core";
import { IComponentProps } from "../../core/component/types";
import template from "./template.hbs";

export class ListItem extends Component {
    constructor({id, className, children}: IComponentProps = {}) {
        super({id, className, children}, template);
    }
}

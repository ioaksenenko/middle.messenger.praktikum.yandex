import { TComponentOrComponentArray } from "../../core/component/types";
import { Link } from "../link";
import { ListItem } from "../list-item";

export class NavLink extends Link {
    protected render(): TComponentOrComponentArray {
        return new ListItem({
            children: new Link(this.props)
        });
    }
}

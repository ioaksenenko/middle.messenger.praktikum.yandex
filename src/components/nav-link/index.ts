import { Link } from "../link";
import { ListItem } from "../list-item";

import type { TComponentOrComponentArray } from "../../core/component/types";

export class NavLink extends Link {
    protected render(): TComponentOrComponentArray {
        return new ListItem({
            children: new Link(this.props)
        });
    }
}

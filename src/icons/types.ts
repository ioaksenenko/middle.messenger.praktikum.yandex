import { IComponentProps } from "../core/component/types";
import { Color } from "../types";

export interface IIconProps extends Omit<IComponentProps, "children"> {
    size?: number;
    fill?: Color;
}

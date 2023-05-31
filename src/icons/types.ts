import type { IComponentProps } from "../core/component/types";
import type { Color } from "../types";

export interface IIconProps extends Omit<IComponentProps, "children"> {
    size?: number;
    fill?: Color;
}

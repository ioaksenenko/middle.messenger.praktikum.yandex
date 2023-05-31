import type { IComponentProps } from "../../core/component/types";

export interface IImageProps extends Omit<IComponentProps, "children"> {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
}

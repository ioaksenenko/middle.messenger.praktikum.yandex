import { IBoxProps } from "../box/types";

export interface IOverlayProps extends Omit<IBoxProps, "width" | "height" | "position"> { };

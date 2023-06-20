import type { IBoxProps } from "../box/types";

export type IOverlayProps = Omit<IBoxProps, "width" | "height" | "position"> & {
    onClick?: (event: MouseEvent) => void;
};

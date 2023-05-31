import type { ITypographyProps } from "../typography/types";

export interface ILabelProps extends Omit<ITypographyProps, "tag"> {
    forId?: string;
}

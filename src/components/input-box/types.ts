import type { TIcon, IconPosition } from "../../types";
import type { IInputProps } from "../input/types";

export interface IValidationRule {
    error: string;
    validate: (value: string) => boolean;
}

export interface IInputBoxProps extends Omit<IInputProps, "focus"> {
    label?: string;
    icon?: TIcon;
    iconPosition?: IconPosition;
    validationRules?: IValidationRule[];
    error?: string;
    onIconClick?: EventListener;
    isFocused?: boolean;
}

import { TIcon } from "../../types";
import { IInputProps } from "../input/types";
import { IconPosition } from "../../types";

export interface IValidationRule {
    error: string;
    validate: (value: string) => boolean;
}

export interface IInputBoxProps extends Omit<IInputProps, "focus"> {
    label?: string;
    icon?: TIcon;
    iconPosition?: IconPosition;
    validationRules?: Array<IValidationRule>;
    error?: string;
    onIconClick?: EventListener;
    isFocused?: boolean;
};

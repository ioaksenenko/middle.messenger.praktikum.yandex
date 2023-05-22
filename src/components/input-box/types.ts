import { TIcon } from "../../types";
import { IInputProps } from "../input/types";
import { IconPosition } from "../../types";

export interface IValidationRule {
    error: string;
    validate: (value: string) => boolean;
}

export interface IInputBoxProps extends IInputProps {
    label?: string;
    icon?: TIcon;
    iconPosition?: IconPosition;
    validationRules?: Array<IValidationRule>;
    error?: string;
};

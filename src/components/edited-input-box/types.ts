import type { IUser } from "../../api/user-api/types";
import type { IInputBoxProps } from "../input-box/types";

export interface IEditedInputBoxProps extends IInputBoxProps {
    isEditing?: boolean;
}

export interface IEditedInputBoxState {
    user?: IUser;
    errors?: Record<string, string[]>;
}

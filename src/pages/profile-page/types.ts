import type { IUser } from "../../api/user-api/types";
import type { IRequestState } from "../../core/store/types";

export interface IProfilePageProps {
    emailIsEditing?: boolean;
    loginIsEditing?: boolean;
    firstNameIsEditing?: boolean;
    lastNameIsEditing?: boolean;
    phoneIsEditing?: boolean;
    displayNameIsEditing?: boolean;
    user?: IRequestState<IUser>;
}

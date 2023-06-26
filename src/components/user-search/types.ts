import type { IComponentProps } from "../../core/component/types";
import type { IRequestState } from "../../core/store/types";
import type { IUser } from "../../api/user-api/types";

export interface IUserSearchProps extends IComponentProps {
    searchResults?: IRequestState<IUser[]> & {
        selectedUsers?: IUser[];
        query?: string;
    };
}

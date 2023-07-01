import type { IUser } from "../../api/user-api/types";

export interface IUserSearchState {
    searchResults?: {
        selectedUsers?: IUser[];
        query?: string;
        data?: IUser[];
    };
}

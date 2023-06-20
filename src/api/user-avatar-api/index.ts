import { BaseAPI, httpInstance } from "../base-api";
import { USER_PROFILE_AVATAR } from "../../constants/url";
import { isFormData } from "./helpers";

import type { TUserRetrieveResponseData } from "../user-api/types";
import type { IResponse } from "../../core/http-transport/types";

class UserAvatarAPI extends BaseAPI {
    async update<T = FormData>(data: T): Promise<IResponse<TUserRetrieveResponseData>> {
        if (!isFormData(data)) {
            throw new Error("Expected FormData type");
        }
        return await httpInstance.put<FormData, TUserRetrieveResponseData>(
            USER_PROFILE_AVATAR,
            data,
            {}
        );
    }
}

export default new UserAvatarAPI();

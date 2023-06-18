import { BaseAPI, httpInstance } from "../base-api";
import { USER_PROFILE_AVATAR } from "../../constants/url";

import type { TUserResponseData } from "../user-api/types";
import type { IResponse } from "../../core/http-transport/types";

class UserAvatarAPI extends BaseAPI {
    async update<T = FormData>(data: T): Promise<IResponse<TUserResponseData>> {
        return await httpInstance.put<FormData, TUserResponseData>(
            USER_PROFILE_AVATAR,
            data as FormData,
            {}
        );
    }
}

export default new UserAvatarAPI();

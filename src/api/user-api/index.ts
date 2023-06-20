import { BaseAPI, httpInstance } from "../base-api";
import { USER_URL, USER_PROFILE } from "../../constants/url";
import { isUserUpdateRequestData } from "./helpers";

import type { TUserRetrieveResponseData, TUserUpdateRequestData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class UserAPI extends BaseAPI {
    async request(): Promise<IResponse<TUserRetrieveResponseData>> {
        return await httpInstance.get(USER_URL);
    }

    async update<T = TUserUpdateRequestData>(data: T): Promise<IResponse<TUserRetrieveResponseData>> {
        if (!isUserUpdateRequestData(data)) {
            throw new Error("Expected TUserUpdateRequestData type");
        }
        return await httpInstance.put<TUserUpdateRequestData, TUserRetrieveResponseData>(
            USER_PROFILE,
            data
        );
    }
}

export default new UserAPI();

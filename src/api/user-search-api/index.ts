import { BaseAPI, httpInstance } from "../base-api";
import { USER_SEARCH_URL } from "../../constants/url";
import { isUserSearchRequestData } from "./helpers";

import type { IUserSearchRequestData, TUserSearchResponseData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class UserSearchAPI extends BaseAPI {
    async request<T = IUserSearchRequestData>(data: T): Promise<IResponse<TUserSearchResponseData>> {
        if (!isUserSearchRequestData(data)) {
            throw new Error("Expected IUserSearchRequestData type");
        }
        return await httpInstance.post<IUserSearchRequestData, TUserSearchResponseData>(
            USER_SEARCH_URL,
            data
        );
    }
}

export default new UserSearchAPI();

import { BaseAPI, httpInstance } from "../base-api";
import { USER_PASSWORD } from "../../constants/url";
import { isUserPasswordUpdateRequestData } from "./helpers";

import type { IUserPasswordUpdateRequestData, TUserPasswordUpdateResponseData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class UserPasswordAPI extends BaseAPI {
    async update<T = IUserPasswordUpdateRequestData>(data: T): Promise<IResponse<TUserPasswordUpdateResponseData>> {
        if (!isUserPasswordUpdateRequestData(data)) {
            throw new Error("Expected IUserPasswordUpdateRequestData type");
        }
        return await httpInstance.put<IUserPasswordUpdateRequestData, TUserPasswordUpdateResponseData>(
            USER_PASSWORD,
            data
        );
    }
}

export default new UserPasswordAPI();

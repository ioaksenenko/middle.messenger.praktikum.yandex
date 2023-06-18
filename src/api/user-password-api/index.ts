import { BaseAPI, httpInstance } from "../base-api";
import { USER_PASSWORD } from "../../constants/url";

import type { IUserPasswordUpdateRequestData, TUserPasswordUpdateResponseData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class UserPasswordAPI extends BaseAPI {
    async update<T = IUserPasswordUpdateRequestData>(data: T): Promise<IResponse<TUserPasswordUpdateResponseData>> {
        return await httpInstance.put<IUserPasswordUpdateRequestData, TUserPasswordUpdateResponseData>(
            USER_PASSWORD,
            data as IUserPasswordUpdateRequestData
        );
    }
}

export default new UserPasswordAPI();

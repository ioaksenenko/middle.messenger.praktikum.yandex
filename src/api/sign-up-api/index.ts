import { BaseAPI, httpInstance } from "../base-api";
import { SIGNUP_URL } from "../../constants/url";

import type { ISignUpRequestData, TSignUpResponseData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class SignUpAPI extends BaseAPI {
    async request<T = ISignUpRequestData>(data: T): Promise<IResponse<TSignUpResponseData>> {
        return await httpInstance.post<ISignUpRequestData, TSignUpResponseData>(
            SIGNUP_URL, data as ISignUpRequestData
        );
    }
}

export default new SignUpAPI();

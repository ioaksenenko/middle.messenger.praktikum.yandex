import { BaseAPI, httpInstance } from "../base-api";
import { SIGNUP_URL } from "../../constants/url";
import { isSignUpRequestData } from "./helpers";

import type { ISignUpRequestData, TSignUpResponseData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class SignUpAPI extends BaseAPI {
    async request<T = ISignUpRequestData>(data: T): Promise<IResponse<TSignUpResponseData>> {
        if (!isSignUpRequestData(data)) {
            throw new Error("Expected ISignUpRequestData type");
        }
        return await httpInstance.post<ISignUpRequestData, TSignUpResponseData>(
            SIGNUP_URL,
            data
        );
    }
}

export default new SignUpAPI();

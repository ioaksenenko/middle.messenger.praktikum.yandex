import { BaseAPI, httpInstance } from "../base-api";
import { SIGNIN_URL } from "../../constants/url";
import { isSignInRequestData } from "./helpers";

import type { ISignInRequestData, TSignInResponseData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class SignInAPI extends BaseAPI {
    async request<T = ISignInRequestData>(data: T): Promise<IResponse<TSignInResponseData>> {
        if (!isSignInRequestData(data)) {
            throw new Error("Expected ISignInRequestData type");
        }
        return await httpInstance.post<ISignInRequestData, TSignInResponseData>(
            SIGNIN_URL,
            data
        );
    }
}

export default new SignInAPI();

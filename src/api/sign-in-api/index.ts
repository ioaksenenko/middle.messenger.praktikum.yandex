import { BaseAPI, httpInstance } from "../base-api";
import { SIGNIN_URL } from "../../constants/url";

import type { ISignInRequestData, TSignInResponseData } from "./types";
import type { IResponse } from "../../core/http-transport/types";

class SignInAPI extends BaseAPI {
    async request<T = ISignInRequestData>(data: T): Promise<IResponse<TSignInResponseData>> {
        return await httpInstance.post<ISignInRequestData, TSignInResponseData>(
            SIGNIN_URL,
            data as ISignInRequestData
        );
    }
}

export default new SignInAPI();

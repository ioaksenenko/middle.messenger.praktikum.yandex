import { BaseAPI, httpInstance } from "../base-api";
import { LOGOUT_URL } from "../../constants/url";

import type { IResponse } from "../../core/http-transport/types";

class LogoutAPI extends BaseAPI {
    async request(): Promise<IResponse> {
        return await httpInstance.post(LOGOUT_URL);
    }
}

export default new LogoutAPI();

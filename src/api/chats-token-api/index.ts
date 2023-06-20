import { BaseAPI, httpInstance } from "../base-api";
import { CHATS_TOKEN_URL } from "../../constants/url";
import { isChatsTokenRequestData } from "./helpers";

import type { IResponse } from "../../core/http-transport/types";
import type { IChatsTokenRequestData, TChatsTokenResponseData } from "./types";

class ChatsTokenAPI extends BaseAPI {
    async request<T = IChatsTokenRequestData>(data: T): Promise<IResponse<TChatsTokenResponseData>> {
        if (!isChatsTokenRequestData(data)) {
            throw new Error("Expected IChatsTokenRequestData type");
        }
        return await httpInstance.post<IChatsTokenRequestData, TChatsTokenResponseData>(
            CHATS_TOKEN_URL.replace("{id}", data.id.toString())
        );
    }
}

export default new ChatsTokenAPI();

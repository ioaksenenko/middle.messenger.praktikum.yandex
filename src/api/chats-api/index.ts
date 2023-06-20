import { BaseAPI, httpInstance } from "../base-api";
import { CHATS_URL } from "../../constants/url";
import { isChatListRequestData, isChatCreateRequestData, isChatDeleteRequestData } from "./helpers";

import type {
    IChatListRequestData,
    TChatListResponseData,
    IChatCreateRequestData,
    IChatDeleteRequestData,
    TChatDeleteResponseData
} from "./types";
import type { IResponse } from "../../core/http-transport/types";

class ChatsAPI extends BaseAPI {
    async request<T = IChatListRequestData>(data?: T): Promise<IResponse<TChatListResponseData>> {
        if (!isChatListRequestData(data)) {
            throw new Error("Expected IChatListRequestData type");
        }
        return await httpInstance.get<IChatListRequestData, TChatListResponseData>(
            CHATS_URL,
            data
        );
    }

    async create<T = IChatCreateRequestData>(data: T): Promise<IResponse> {
        if (!isChatCreateRequestData(data)) {
            throw new Error("Expected IChatCreateRequestData type");
        }
        return await httpInstance.post<IChatCreateRequestData>(
            CHATS_URL,
            data
        );
    }

    async delete<T = IChatDeleteRequestData>(data: T): Promise<IResponse<TChatDeleteResponseData>> {
        if (!isChatDeleteRequestData(data)) {
            throw new Error("Expected IChatDeleteRequestData type");
        }
        return await httpInstance.delete<IChatDeleteRequestData, TChatDeleteResponseData>(
            CHATS_URL,
            data
        );
    }
}

export default new ChatsAPI();

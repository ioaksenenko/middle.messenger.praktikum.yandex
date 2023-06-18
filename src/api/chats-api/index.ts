import { BaseAPI, httpInstance } from "../base-api";
import { CHATS_URL } from "../../constants/url";

import type {
    IChatListRequestData,
    TChatListResponseData,
    IChatCreateRequestData,
    IChatDeleteRequestData,
    IChatDeleteResponseData
} from "./types";
import type { IResponse } from "../../core/http-transport/types";

class ChatsAPI extends BaseAPI {
    async request<T = IChatListRequestData>(data?: T): Promise<IResponse<TChatListResponseData>> {
        return await httpInstance.get<IChatListRequestData, TChatListResponseData>(
            CHATS_URL,
            data as IChatListRequestData
        );
    }

    async create<T = IChatCreateRequestData>(data: T): Promise<IResponse> {
        return await httpInstance.post<IChatCreateRequestData>(
            CHATS_URL,
            data as IChatCreateRequestData
        );
    }

    async delete<T = IChatDeleteRequestData>(data: T): Promise<IResponse<IChatDeleteResponseData>> {
        return await httpInstance.delete<IChatDeleteRequestData, IChatDeleteResponseData>(
            CHATS_URL,
            data as IChatDeleteRequestData
        );
    }
}

export default new ChatsAPI();

import { BaseAPI, httpInstance } from "../base-api";
import { CHATS_USERS_URL, CHATS_USERS_LIST_URL } from "../../constants/url";
import { isChatsUsersRequestData, isChatsUsersListRequestData } from "./helpers";

import type {
    IChatsUsersRequestData,
    IChatsUsersResponseData,
    IChatsUsersListRequestData,
    IChatsUsersListResponseData
} from "./types";
import type { IResponse } from "../../core/http-transport/types";

class ChatsUsersAPI extends BaseAPI {
    async request<T = IChatsUsersListRequestData>(data: T): Promise<IResponse<IChatsUsersListResponseData>> {
        if (!isChatsUsersListRequestData(data)) {
            throw new Error("Expected IChatsUsersListResponseData type");
        }
        const { chatId, ...rest } = data;
        return await httpInstance.get<Omit<IChatsUsersListRequestData, "chatId">, IChatsUsersListResponseData>(
            CHATS_USERS_LIST_URL.replace("{id}", chatId.toString()),
            rest
        );
    }

    async update<T = IChatsUsersRequestData>(data?: T): Promise<IResponse<IChatsUsersResponseData>> {
        if (!isChatsUsersRequestData(data)) {
            throw new Error("Expected IChatsUsersRequestData type");
        }
        return await httpInstance.put<IChatsUsersRequestData, IChatsUsersResponseData>(
            CHATS_USERS_URL,
            data
        );
    }

    async delete<T = IChatsUsersRequestData>(data: T): Promise<IResponse<IChatsUsersResponseData>> {
        if (!isChatsUsersRequestData(data)) {
            throw new Error("Expected IChatsUsersRequestData type");
        }
        return await httpInstance.delete<IChatsUsersRequestData, IChatsUsersResponseData>(
            CHATS_USERS_URL,
            data
        );
    }
}

export default new ChatsUsersAPI();

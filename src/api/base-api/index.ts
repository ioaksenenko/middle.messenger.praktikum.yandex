import { HTTPTransport } from "../../core";
import { BASE_URL } from "../../constants/url";

export class BaseAPI {
    create<TRequestData = never>(_: TRequestData): void {
        throw new Error("Not implemented");
    }

    request<TRequestData = never>(_: TRequestData): void {
        throw new Error("Not implemented");
    }

    update<TRequestData = never>(_: TRequestData): void {
        throw new Error("Not implemented");
    }

    delete<TRequestData = never>(_: TRequestData): void {
        throw new Error("Not implemented");
    }
}

export const httpInstance = new HTTPTransport(BASE_URL);

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export type TRequestUrl = string | URL;

export type TRequestHeaders = Record<string, string>;

export type TRequestData = Document | XMLHttpRequestBodyInit | null | undefined;

export interface IRequestOptions {
    method?: RequestMethod;
    headers?: TRequestHeaders;
    data?: TRequestData;
    timeout?: number;
}

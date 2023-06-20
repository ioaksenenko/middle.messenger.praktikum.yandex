export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export type TRequestUrl = string | URL;

export type TRequestHeaders = Record<string, string>;

export type TRequestDataDefault = Document | XMLHttpRequestBodyInit | null | undefined;

export interface IResponse<TResponseData = any> {
    status: number;
    data: TResponseData;
}

export interface IRequestOptions<TRequestData = TRequestDataDefault> {
    method?: RequestMethod;
    headers?: TRequestHeaders;
    data?: TRequestData;
    timeout?: number;
    withCredentials?: boolean;
}

import { RequestMethod } from "./types";
import { queryStringify } from "./helpers";

import type { IRequestOptions, TRequestUrl, TRequestDataDefault, IResponse, TRequestHeaders } from "./types";

export class HTTPTransport {
    private readonly _baseURL: string | undefined;

    constructor(baseURL?: string) {
        this._baseURL = baseURL;
    }

    get = async<TRequestData = never, TResponseData = never>(
        url: TRequestUrl,
        data?: TRequestData,
        headers?: TRequestHeaders,
        options: IRequestOptions = {}
    ): Promise<IResponse> => (
        await this.request<TRequestData, TResponseData>(
            url,
            {
                ...options,
                method: RequestMethod.GET,
                data,
                headers
            },
            options.timeout
        )
    );

    put = async<TRequestData = never, TResponseData = never>(
        url: TRequestUrl,
        data?: TRequestData,
        headers?: TRequestHeaders,
        options: IRequestOptions = {}
    ): Promise<IResponse<TResponseData>> => (
        await this.request<TRequestData, TResponseData>(
            url,
            {
                ...options,
                method: RequestMethod.PUT,
                data,
                headers
            },
            options.timeout
        )
    );

    post = async<TRequestData = never, TResponseData = never>(
        url: TRequestUrl,
        data?: TRequestData,
        headers?: TRequestHeaders,
        options: IRequestOptions = {}
    ): Promise<IResponse<TResponseData>> => (
        await this.request<TRequestData, TResponseData>(
            url,
            {
                ...options,
                method: RequestMethod.POST,
                data,
                headers
            },
            options.timeout
        )
    );

    delete = async<TRequestData = never, TResponseData = never>(
        url: TRequestUrl,
        data?: TRequestData,
        headers?: TRequestHeaders,
        options: IRequestOptions = {}
    ): Promise<IResponse> => (
        await this.request<TRequestData, TResponseData>(
            url,
            {
                ...options,
                method: RequestMethod.DELETE,
                data,
                headers
            },
            options.timeout
        )
    );

    request = async<TRequestData = TRequestDataDefault, TResponseData = any>(
        url: TRequestUrl,
        {
            method = RequestMethod.GET,
            headers = {
                "Content-Type": "application/json"
            },
            data,
            withCredentials = true
        }: IRequestOptions<TRequestData> = {},
        timeout = 5000
    ): Promise<IResponse<TResponseData>> => (
        await new Promise<IResponse<TResponseData>>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (method === RequestMethod.GET && typeof data !== "undefined") {
                url = `${typeof url === "string" ? url : url.href}${queryStringify(data)}`;
            }

            xhr.open(method, this._baseURL && typeof url === "string" ? `${this._baseURL}${url}` : url);

            headers && Object.entries(headers).forEach(
                ([key, val]) => {
                    xhr.setRequestHeader(key, val);
                }
            );

            xhr.timeout = timeout;
            xhr.withCredentials = withCredentials;

            xhr.onload = () => {
                let data = null;
                try {
                    data = JSON.parse(xhr.response);
                } catch {}
                resolve({
                    status: xhr.status,
                    data
                });
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === RequestMethod.GET || typeof data === "undefined") {
                xhr.send();
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            }
        })
    );
}

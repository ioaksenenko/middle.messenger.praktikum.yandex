import { RequestMethod } from "./types";
import { queryStringify } from "./helpers";

import type { IRequestOptions, TRequestUrl } from "./types";

export class HTTPTransport {
    get = async(url: TRequestUrl, options: IRequestOptions = {}): Promise<XMLHttpRequest> => {
        return await this.request(url, { ...options, method: RequestMethod.GET }, options.timeout);
    };

    put = async(url: TRequestUrl, options: IRequestOptions = {}): Promise<XMLHttpRequest> => {
        return await this.request(url, { ...options, method: RequestMethod.PUT }, options.timeout);
    };

    post = async(url: TRequestUrl, options: IRequestOptions = {}): Promise<XMLHttpRequest> => {
        return await this.request(url, { ...options, method: RequestMethod.POST }, options.timeout);
    };

    delete = async(url: TRequestUrl, options: IRequestOptions = {}): Promise<XMLHttpRequest> => {
        return await this.request(url, { ...options, method: RequestMethod.DELETE }, options.timeout);
    };

    request = async(url: TRequestUrl, { method = RequestMethod.GET, headers, data }: IRequestOptions = {}, timeout = 5000): Promise<XMLHttpRequest> => {
        return await new Promise<XMLHttpRequest>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (method === RequestMethod.GET && typeof data !== "undefined") {
                url = `${typeof url === "string" ? url : url.href}${queryStringify(data)}`;
            }

            xhr.open(method, url);

            headers && Object.entries(headers).forEach(
                ([key, val]) => {
                    xhr.setRequestHeader(key, val);
                }
            );

            xhr.timeout = timeout;

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === RequestMethod.GET || typeof data === "undefined") {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

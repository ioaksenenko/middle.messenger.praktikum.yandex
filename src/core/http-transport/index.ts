import { RequestMethod, IRequestOptions, TRequestUrl } from "./types";
import { queryStringify } from "./helpers";

export class HTTPTransport {
    get = (url: TRequestUrl, options: IRequestOptions = {}) => {
        return this.request(url, { ...options, method: RequestMethod.GET }, options.timeout);
    };

    put = (url: TRequestUrl, options: IRequestOptions = {}) => {
        return this.request(url, { ...options, method: RequestMethod.PUT }, options.timeout);
    };

    post = (url: TRequestUrl, options: IRequestOptions = {}) => {
        return this.request(url, { ...options, method: RequestMethod.POST }, options.timeout);
    };

    delete = (url: TRequestUrl, options: IRequestOptions = {}) => {
        return this.request(url, { ...options, method: RequestMethod.DELETE }, options.timeout);
    };

    request = (url: TRequestUrl, {method = RequestMethod.GET, headers, data}: IRequestOptions = {}, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
          
            if (method === RequestMethod.GET && data) {
                url = `${url}${queryStringify(data)}`;
            }
          
            xhr.open(method, url);
            
            headers && Object.entries(headers).forEach(
                ([key, val]) => xhr.setRequestHeader(key, val)
            );

            xhr.timeout = timeout;
          
            xhr.onload = () => resolve(xhr);
          
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
          
            if (method === RequestMethod.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

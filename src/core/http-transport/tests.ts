import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import { assert } from "chai";
import { RequestMethod } from "./types";
import { HTTPTransport } from ".";

import type { IResponse, TRequestDataDefault } from "./types";

const FakeXMLHttpRequest = sinon.useFakeXMLHttpRequest();

(global as any).XMLHttpRequest = FakeXMLHttpRequest;

describe("HTTPTransport tests", () => {
    const http: HTTPTransport = new HTTPTransport();
    let request: sinon.SinonFakeXMLHttpRequest | null;

    beforeEach(() => {
        request = null;
        FakeXMLHttpRequest.onCreate = (xhr) => {
            request = xhr;
        };
    });

    describe("request method tests", () => {
        let responsePromise: Promise<IResponse>;

        const createRequest = <TRequestData = TRequestDataDefault>(
            url: string = "",
            method: RequestMethod = RequestMethod.GET,
            requestData?: TRequestData,
            responseData: string = "",
            httpTransport: HTTPTransport = http
        ): void => {
            responsePromise = httpTransport.request(url, {
                method,
                data: requestData
            });
            request?.respond(
                200,
                { "Content-Type": "application/json" },
                responseData
            );
        };

        it("should create XMLHttpRequest", () => {
            createRequest();
            assert.isNotNull(request);
        });

        it("should add data to url as search params when request method is GET and data param is not undefined", () => {
            const { HTTPTransport } = proxyquire(".", {
                "./helpers": {
                    queryStringify: sinon.stub().returns("?a=1&b=2")
                }
            });
            const http = new HTTPTransport();
            const url: string = "/some/path/";
            const method: RequestMethod = RequestMethod.GET;
            const requestData: Record<string, number> = { a: 1, b: 2 };
            createRequest(url, method, requestData, undefined, http);
            const expected = "/some/path/?a=1&b=2";
            const actual = request?.url;
            assert.equal(actual, expected);
        });

        it("should add data to request body when request method is POST and data param is not undefined", () => {
            const url: string = "/some/path/";
            const method: RequestMethod = RequestMethod.POST;
            const requestData: Record<string, number> = { a: 1, b: 2 };
            createRequest(url, method, requestData);
            const expected = '{"a":1,"b":2}';
            const actual = request?.requestBody;
            assert.equal(actual, expected);
        });

        it("should add FormData to request body when request method is POST and data param instance of FormData", () => {
            const url: string = "/some/path/";
            const method: RequestMethod = RequestMethod.POST;
            const requestData: FormData = new FormData();
            createRequest(url, method, requestData);
            assert.instanceOf(request?.requestBody, FormData);
        });

        it("should return response data", (done) => {
            const url: string = "/some/path/";
            const method: RequestMethod = RequestMethod.GET;
            const requestData: Record<string, number> = { a: 1, b: 2 };
            const responseData: string = '[{"a":1,"b":2}]';
            createRequest(url, method, requestData, responseData);
            responsePromise.then(response => {
                const expected = responseData;
                const actual = JSON.stringify(response.data);
                assert.equal(actual, expected);
                done();
            }).catch((error) => {
                done(new Error(error));
            });
        });
    });

    describe("get method tests", () => {
        it("should request method be GET", () => {
            const url = "/some/path/";
            http.get(url).catch(() => {});
            assert.equal(request?.method, RequestMethod.GET);
        });
    });

    describe("post method tests", () => {
        it("should request method be POST", () => {
            const url = "/some/path/";
            http.post(url).catch(() => {});
            assert.equal(request?.method, RequestMethod.POST);
        });
    });

    describe("put method tests", () => {
        it("should request method be PUT", () => {
            const url = "/some/path/";
            http.put(url).catch(() => {});
            assert.equal(request?.method, RequestMethod.PUT);
        });
    });

    describe("delete method tests", () => {
        it("should request method be DELETE", () => {
            const url = "/some/path/";
            http.delete(url).catch(() => {});
            assert.equal(request?.method, RequestMethod.DELETE);
        });
    });
});

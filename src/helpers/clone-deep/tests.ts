import { assert } from "chai";
import { cloneDeep } from ".";

describe("cloneDeep function tests", () => {
    describe("test cloneDeep when input is object that has only one key without nested", () => {
        let key: string;
        let val: string;
        let expected: Record<string, string>;
        let actual: Record<string, string>;

        beforeEach(() => {
            key = "some-key";
            val = "some-val";
            expected = {
                [key]: val
            };
            actual = cloneDeep(expected) as Record<string, string>;
        });

        it("should return an object that has a different reference than the original", () => {
            assert.notEqual(actual, expected);
        });

        it("should return an object that has same key and value like original one", () => {
            assert.propertyVal(actual, key, val);
        });
    });

    describe("test cloneDeep when input is object that has only one key with nested object that has only one key", () => {
        let key: string;
        let nestedKey: string;
        let val: string;
        let expected: Record<string, Record<string, string>>;
        let actual: Record<string, Record<string, string>>;

        beforeEach(() => {
            key = "some-key";
            nestedKey = "some-nested-key";
            val = "some-val";
            expected = {
                [key]: {
                    [nestedKey]: val
                }
            };
            actual = cloneDeep(expected) as Record<string, Record<string, string>>;
        });

        it("should return an object that has a different reference than the original", () => {
            assert.notEqual(actual, expected);
        });

        it("should return an object that has nested object that has a different reference than the original", () => {
            assert.notEqual(actual[key], expected[key]);
        });

        it("should return an object that has same key like original one", () => {
            assert.property(actual, key);
        });

        it("should return an object that has nested object that has same key and value like original one", () => {
            assert.propertyVal(actual[key], nestedKey, val);
        });
    });
});

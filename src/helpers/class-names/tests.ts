import { expect } from "chai";
import { classNames } from ".";

describe("classNames function tests", () => {
    it("should work with strings", () => {
        expect(classNames("foo", "bar")).to.eq("foo bar");
    });

    it("should work with undefined and boolean types", () => {
        expect(classNames("foo", undefined, "bar", false)).to.eq("foo bar");
    });
});

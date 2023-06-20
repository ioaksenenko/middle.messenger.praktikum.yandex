import { BASE_URL, RESOURCE_URL } from "../constants/url";
import { join } from "./join";

export const makeResourcePath = (path?: string): string => (
    path ? join(BASE_URL, RESOURCE_URL, path) : ""
);

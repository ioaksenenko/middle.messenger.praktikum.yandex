import { identity } from "../../helpers";

import type { IUser, TUserUpdateRequestData } from "../../api/user-api/types";

export const getDisplayName = (data: IUser): string => {
    const firstName = (data.first_name ?? "").trim();
    const secondName = (data.second_name ?? "").trim();
    const displayName = (data.display_name ?? "").trim();
    return displayName ?? [firstName, secondName].filter(identity).join(" ") ?? "";
};

export const prepareData = (data: IUser): TUserUpdateRequestData => {
    const firstName = (data.first_name ?? "").trim();
    const secondName = (data.second_name ?? "").trim();
    const displayName = (data.display_name ?? "").trim();
    const login = (data.login ?? "").trim();
    const email = (data.email ?? "").trim();
    const phone = (data.phone ?? "").trim();
    return {
        first_name: firstName,
        second_name: secondName,
        display_name: displayName ?? [firstName, secondName].filter(identity).join(" ") ?? "",
        login,
        email,
        phone
    };
};

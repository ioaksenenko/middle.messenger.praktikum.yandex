import type {
    ArrowLeftIcon,
    EditIcon,
    SearchIcon,
    TrashIcon,
    UploadIcon,
    ChevronRightIcon,
    AttachmentIcon,
    CheckIcon
} from "../icons";

export type TIcon =
    | ArrowLeftIcon
    | EditIcon
    | SearchIcon
    | TrashIcon
    | UploadIcon
    | ChevronRightIcon
    | AttachmentIcon
    | CheckIcon;

export enum Color {
    primary1 = "primary1",
    primary2 = "primary2",
    secondary1 = "secondary1",
    secondary2 = "secondary2",
    white = "white",
    black = "black",
    error = "error"
}

export enum Size {
    large = "large",
    medium = "medium",
    small = "small",
    xsmall = "xsmall"
}

export enum Shape {
    geometric = "geometric",
    rounded = "rounded",
    circular = "circular"
}

export enum IconPosition {
    left = "left",
    right = "right"
}

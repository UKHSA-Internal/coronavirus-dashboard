import { ComponentType } from "react";

export type TimestampProps = ComponentType & {
    timestamp: string,
    format?:   string
};

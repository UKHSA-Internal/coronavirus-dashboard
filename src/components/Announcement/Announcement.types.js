// @flow

import { ReactNode } from "react";

declare export type DateTime = {
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number
}

declare export type AnnouncementProps = {

    children: ReactNode,
    firstDisplayDate: DateTime,
    lastDisplayDate: DateTime

}; // AnnouncementProps
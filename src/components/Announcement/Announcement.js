// @flow

import React  from "react";
import type { ComponentType } from 'react';

import * as Style from "./Announcement.style"
import type { AnnouncementProps } from "./Announcement.types";


/**
 * Create a blue announcement banner.
 *
 * @param children { any } Child elements - contents of the banner.
 * @param firstDisplayDate { DateTime } Must include year, month, and day. Hour and minute are optional.
 * @param lastDisplayDate { DateTime } Must include year, month, and day. Hour and minute are optional.
 * @returns {null | any } The banner.
 */
const Announcement: ComponentType<AnnouncementProps> = ({ children, firstDisplayDate, lastDisplayDate }): ReactNode|null => {

    const
        now = new Date(),
        start = new Date(
            firstDisplayDate.year,
            firstDisplayDate.month,
            firstDisplayDate.day,
            firstDisplayDate?.hour ?? 0,
            firstDisplayDate?.minute ?? 0
        ),
        end = new Date(
            lastDisplayDate.year,
            lastDisplayDate.month,
            lastDisplayDate.day,
            lastDisplayDate?.hour ?? 0,
            lastDisplayDate?.minute ?? 0
        );

    if (start > now || end < now) return null;

    return <Style.Container role={ "region" } aria-label={ "Announcement" }>
        { children }
    </Style.Container>

} // Announcement


export default Announcement;

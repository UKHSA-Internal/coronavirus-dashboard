// @flow

import React, { ReactNode } from "react";
import type { ComponentType } from 'react';

import * as Style from "./Announcement.style"
import type { AnnouncementProps } from "./Announcement.types";


/**
 * Create a blue announcement banner.
 *
 * @param children { ReactNode } Child elements - contents of the banner.
 * @param firstDisplayDate { DateTime } Must include year, month, and day. Hour and minute are optional.
 * @param lastDisplayDate { DateTime } Must include year, month, and day. Hour and minute are optional.
 * @returns {null | ReactNode} The banner.
 */
const Announcement: ComponentType<AnnouncementProps> = ({ children, firstDisplayDate, lastDisplayDate }: AnnouncementProps): ReactNode|null => {

    const
        now = new Date(),
        start = new Date(
            firstDisplayDate.year,
            firstDisplayDate.month - 1,
            firstDisplayDate.day,
            firstDisplayDate?.hour ?? 0,
            firstDisplayDate?.minute ?? 0
        ),
        end = new Date(
            lastDisplayDate.year,
            lastDisplayDate.month - 1,
            lastDisplayDate.day,
            lastDisplayDate?.hour ?? 0,
            lastDisplayDate?.minute ?? 0
        );

    if (start > now || end < now) return null;

    return <Style.Container>
        { children }
    </Style.Container>

} // Announcement


export default Announcement;

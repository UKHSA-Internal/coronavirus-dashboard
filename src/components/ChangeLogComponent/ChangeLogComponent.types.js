// @flow

import type { ElementProps } from "react";


export interface ChangeLogItemType {
    type: string,
    date: string,
    displayBanner?: boolean,
    relativeUrl?: string,
    headline: string,
    body: string
}

export interface ChangeLogInputProps extends ElementProps {
    data: ChangeLogItemType[]
}

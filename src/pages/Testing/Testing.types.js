// @flow

import type { TabType } from "hooks/usePageLayout.types";


export type Props = {||};

export type TabContentProps = TabType & {
    params: any,
}

declare export type TabContentType<P> = React$ComponentType<P>;

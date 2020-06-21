import type { ComponentType } from "react";
import type { TabType } from "hooks/usePageLayout.types";


export type TabLinkProps = {

    label: string,
    children: ComponentType

};  // TabLinkProps


export type TabLinkContainerProps = {

    children: Array<ComponentType>

};  // TabLinkContainerProps


export type TabContentProps = TabType & {
    params: any,
}

declare export type TabContentType<P> = ComponentType<P>;

// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const MainContainer: ComponentType<*> = (() => {

    return styled.div`
    `;

})();  // Container


export const Body: ComponentType<*> = (() => {

    return styled.div`
    width: 100%;

    &.inactive {
        // Do not use "display: none" - It confuses
        // the graph's responsiveness.
        height: 0;
        visibility: hidden !important;
    }
    `;

})();  // Body


export const TabsList: ComponentType<*> = (() => {

    return styled.ul``;

})();  // TabsContainer

export const TabItem: ComponentType<*> = (() => {

    return styled.li``;

})();  // TabsContainer

export const TabItemLink: ComponentType<*> = (() => {

    return styled.a`
        text-decoration: none;
        padding-bottom: 2px;

        &:visited {
            color: #1E70B8;
        }

        &.active:link {
            border-bottom: 4px solid #1E70B8;
        }
    `;

})();  // Tab


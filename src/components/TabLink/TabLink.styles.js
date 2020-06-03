// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const MainContainer: ComponentType<*> = (() => {

    return styled.div`
    `;

})();  // MainContainer


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


export const TabsContainer: ComponentType<*> = (() => {

    return styled.div``;

})();  // TabsContainer


export const Tab: ComponentType<*> = (() => {

    return styled.button`
        color: #1E70B8;
        padding-bottom: 2px;

        &.active {
            color: #1E70B8;
            border-bottom: 4px solid #1E70B8;
        }
    `;

})();  // Tab


// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const MainContainer: ComponentType<*> = (() => {

    return styled.div`
    display: flex;
    flex-direction: column;
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


export const TabsContainer: ComponentType<*> = (() => {

    return styled.div``;

})();  // TabsContainer


export const Tab: ComponentType<*> = (() => {

    return styled.button`
    padding: .5rem 1rem;
    outline: none;
    cursor: pointer;
    color: blue;
    margin-bottom: 5px;
    margin-right: 5px;
    border-color: blue;
    
    &.active {
        margin-bottom: 0 !important;
        border-bottom: 5px solid !important;
    }
    
    &:hover,
    &:active, 
    &:focus {
        margin-bottom: 4px;
        border-bottom: 1px solid;
    }
    `;

})();  // Tab


import styled from "styled-components";

import type { ComponentType } from "react";


export const BodySection: ComponentType<*> = (() => {
        return styled.div`
            flex: 1 1 43%;
            margin: 0 15px;
        `;
})();


export const HBodySection: ComponentType<*> = (() => {
    return styled.section`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 1rem 0 0 0;
        
        & > * {
            margin-right: 2rem;
            margin-bottom: 0;
        }
    `;
})();

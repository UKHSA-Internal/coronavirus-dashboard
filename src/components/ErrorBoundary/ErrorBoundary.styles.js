// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
    return styled.main `
        display: flex;
        flex-direction: column;
        margin-top: 45px;
        margin-bottom: 120px;
    `;
})();

export const DetailsBody: ComponentType<*> = (() => {
    return styled.div `
        white-space: pre-wrap;
    `;
})();
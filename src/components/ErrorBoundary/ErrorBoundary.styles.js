// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Container: ComponentType<*> = (() => {
    const
        classes = 'govuk-width-container',
        Node = styled.div`
            display: flex;
            flex-direction: column;
            margin-top: 45px;
            margin-bottom: 120px;
        `;

    return ({ className, ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const DetailsBody: ComponentType<*> = (() => {
    const
        classes = 'govuk-details__text',
        Node = styled.div`
            white-space: pre-wrap;
        `;

    return ({ className, ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();

// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Article: ComponentType<*> = (() => {
    const
        classes = 'about',
        Node = styled.article`
            max-width: 40em
        `;

  return ({ className, ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const Loading = ({ className, ...props }) => (
    <p className={ `govuk-body govuk-!-margin-top-6 ${className}` } { ...props }/>
);


export const Markdown = ({ className, ...props }) => (
    <div className={ `markdown ${className}` } { ...props }/>
);

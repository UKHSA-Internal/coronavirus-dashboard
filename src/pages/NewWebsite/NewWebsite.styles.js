// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Article: ComponentType<*> = (() => {
    const
        classes = 'about',
        Node = styled.article`
            max-width: 40em;
            margin-top: 1rem;
            
            &>.markdown>hr {
                margin-top: 2rem;
                margin-bottom: 3rem;
            }
        `;

  return ({ className = '', ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const Markdown = ({ className = '', ...props }) => (
    <div className={ `markdown ${className}` } { ...props }/>
);

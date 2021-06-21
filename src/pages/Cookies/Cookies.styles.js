// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Article: ComponentType<*> = (() =>
    styled.article`
        max-width: 50em;
    `
)();


export const Heading = ({ className = '', ...props }) => (
    <h2 className={ `govuk-heading-m ${className}` } { ...props }/>
);

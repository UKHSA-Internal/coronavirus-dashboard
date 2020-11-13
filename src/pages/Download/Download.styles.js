// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Loading = ({ className, ...props }) => (
    <p className={ `govuk-body govuk-!-margin-top-6 ${className}` } { ...props }/>
);

const calcTextDecoration = ({enabled}) => {
    return enabled ? 'underline' : 'none';
}

const calcCursor = ({enabled}) => {
    return enabled ? 'pointer' : 'not-allowed';
}

const calcOpacity = ({enabled}) => {
    return enabled ? '1' : '0.5';
}

export const DownloadLink: ComponentType<*> =
    styled
        .a
        .attrs(({ className="", href="", enabled=false }) => ({
            className: `govuk-link ${className}`,
            href: `${href}`
        }))`
            cursor: ${calcCursor};
            opacity: ${calcOpacity};
            text-decoration: ${calcTextDecoration};
        `;

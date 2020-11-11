// @flow

import React from 'react';
import type { ComponentType } from 'react';


export const Loading = ({ className, ...props }) => (
    <p className={ `govuk-body govuk-!-margin-top-6 ${className}` } { ...props }/>
);




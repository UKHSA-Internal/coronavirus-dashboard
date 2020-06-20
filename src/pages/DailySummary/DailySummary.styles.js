// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Container: ComponentType<*> = (() => {
const
    classes = 'util-flex util-flex-wrap',
    Node = styled.div``;

return ({ className = '', ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();

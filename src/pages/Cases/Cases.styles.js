// @flow
import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const VisContainer: ComponentType<*> = (() => {
  const
    classes = 'util-flex util-flex-wrap',
    Node = styled.div`
      margin: 10px -10px;
    `;

  return ({ className = '', ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const VisItem: ComponentType<*> = (() => {
  const
    classes = '',
    Node = styled.div`
      flex: 1 1 43%;
      margin: 10px;
    `;

  return ({ className = '', ...props }) =>
    <Node className={ `${classes} ${className}` } { ...props }/>
})();

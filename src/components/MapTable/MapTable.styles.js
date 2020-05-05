// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Map: ComponentType<*> = (() => {

    return styled.div`
    grid-column: 1;
    grid-row: 1;
    border: 1px solid #0B0C0C;
    height: 590px;
    width: 520px;
    ${ addIECss(css`
      width: 48%;
    `) }
  `;

})();

export const Container: ComponentType<*> = (() => {
    return styled.div`
    display: grid;
    min-height: 500px;
    max-height: 600px;

    ${ addIECss(css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    `) }
  `;
})();

export const P: ComponentType<*> = (() => {

    const Node = styled.p`
        margin: 2em;
        align-self: center;
        justify-self: center;
    `;

    return ({ className = "", children = null, ...props }) =>
        <Node { ...props }
              className={ className + " govuk-body" }>
        { children }
    </Node>

})();


export const MainContainer: ComponentType<*> = (() => {

    return styled.section`
    grid-column: 1/-1;
    grid-row: 4/8;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: .5rem;
    grid-template-rows: 660px 1fr;

    ${ addIECss(css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    `) }
  `

})();

export const TabContainer: ComponentType<*> = (() => {
    return styled.div`
    grid-column: 1;
    grid-row: 1/-1;
    // height: 600px;

    @media only screen and (max-width: 768px) {
      height: unset;
    }
    
    & .govuk-tabs__panel {
      min-height: 620px;
      
      & a {
        text-decoration: none;
      }
    }

    & .govuk-tabs__panel {
      max-height: 485px;
      overflow: auto;

      @media only screen and (max-width: 768px) {
        max-height: none;
      }
    }
  `;
})();

export const ChildrenContainer: ComponentType<*> = (() => {
    return styled.div`
    grid-column: 2;
    grid-row: 2;
    // height: 600px;

    @media only screen and (max-width: 768px) {
      height: unset;
    }
  `;
})();

export const MapViewOption: ComponentType<*> = (() => {
    return styled.div`
    grid-column: 2;
    grid-row: 1;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    
    & .govuk-tabs__panel {
      height: 100%;
      min-height: 590px;
      padding: 0;
    }
    
    @media only screen and (max-width: 768px) {
      height: unset;
    }
  `;
})();

export const Link: ComponentType<*> = (() => {
    const getColor = ({ active }) => active ? '#0B0C0C' : '#1D70B8';
    const getFontWeight = ({ active }) => active ? 'bold' : 400;
    return styled.button`
    color: ${ getColor };
    font-weight: ${ getFontWeight };
    text-decoration: none;
    cursor: pointer;

    &:visited {
      color: ${ getColor } !important; 
    }
  `;
})();

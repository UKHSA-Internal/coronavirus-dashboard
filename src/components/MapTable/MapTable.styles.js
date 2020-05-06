// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';


export const Map: ComponentType<*> = (() => {

    return styled.div`
    grid-column: 1;
    grid-row: 1;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: .5rem;
    grid-template-rows: 660px 1fr;
    
    @media only screen and (max-width: 768px) {
        grid-template-rows: auto 660px auto;
        grid-row: 2/4;
    }

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

    @media only screen and (max-width: 768px) {
      height: unset;
      grid-column: 1/-1;
      grid-row: 2/-1;
    }

    & .govuk-tabs__panel {
      height: 670px;
      overflow: auto;
      
       & a {
        text-decoration: none;
      }

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

    @media only screen and (max-width: 768px) {
      height: unset;
      grid-column: 1/-1;
      grid-row: 1;
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


export const Description: ComponentType<*> = (() => {

    const Node = styled.p`
        margin: 2em;
        align-self: center;
        justify-self: center;
        margin: 0;
        color: #626a6e;
        
        &:last-of-type:not(.above) {
            margin-bottom: 1rem;
        }
        
        &.above {
            display: flex;
            justify-content: flex-end;        
            padding-top: 10px;
            padding-left: 10px;
            align-items: center;
        }
    `;

    return ({ className = "", children = null, ...props }) =>
        <Node { ...props } className={ className + " govuk-body govuk-!-font-size-16" }>
            { children }
        </Node>

})();


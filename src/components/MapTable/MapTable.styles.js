// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';


export const Map: ComponentType<*> = (() => {

    return styled.div`
    grid-column: 1;
    grid-row: 1;
    height: 580px;
    width: 520px;
    
    ${ addIECss(css`
      width: 48%;
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
    display: flex;
    flex-direction: row;
    grid-column: 1/-1;
    align-content: stretch;
    align-items: stretch;
    height: 750px;
    width: 100%;
    
    &>* {
        flex-grow: 1;
        max-width: 50%;
        
        ${ addIECss(css`
          width: 48%;
        `) }
    }
    
    @media only screen and (max-width: 768px) {
        flex-direction: column-reverse;
        
        &>* {
            flex-grow: unset;
            max-width: 100%;
        }
        height: 620px;
    }
  `

})();


export const TabContainer: ComponentType<*> = (() => {
    return styled.div`
    @media only screen and (max-width: 768px) {
      height: unset;
      grid-column: 1/-1;
      grid-row: 2/-1;
    }

    & .govuk-tabs__panel {
      height: 650px;
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
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 768px) {
      height: unset;
    }
  `;
})();


export const MapViewOption: ComponentType<*> = (() => {
    return styled.div`
    height: 640px;
    `;
})();

export const RightContainer: ComponentType<*> = (() => {
    return styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    flex-grow: 1;

    & .govuk-tabs__panel {
      height: 580px;
      padding: 0;
    }
    
    @media only screen and (max-width: 768px) {
      max-height: 50px;
    }
  `;
})();


export const ResetLink: ComponentType<*> = (() => {

    return styled.a`
    position: absolute;
    top: 0;
    right: 0;
    padding: 2px 5px;
    z-index: 987654321;
    background: rgba(255, 255, 255, .5);
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


// @flow

import styled, { css } from 'styled-components';
import type { ComponentType } from 'react';

import addIECss from 'addIECss';

export const Container: ComponentType<*> = (() => {
    return styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #b1b4b6;
    padding-top: 20px;
    grid-column: span 1;
    margin-bottom: 2rem;
    
    @media only screen and (max-width: 768px) {
        &:nth-child(n+1) {
            margin-right: 0; 
        }
    }
    
    ${ addIECss(css`
      width: 100%;
    `) }
  `;
})();


export const Caption: ComponentType<*> = (() => {
    return styled.h2`
    margin-bottom: 5px;
    color: black;
    font-size: 20px;
    font-weight: bold;
  `;
})();


export const Description: ComponentType<*> = (() => {
    return styled.p`
    margin: 0;
    color: #626a6e;
  `;
})();


export const Number: ComponentType<*> = (() => {
    return styled.span`
    margin-bottom: 10px;
    color: #367E93;
  `;
})();


export const MainContainer: ComponentType<*> = (() => {

    return styled.section`
    grid-column: 1/-1;
    
    ${ addIECss(css`
      width: 100%;
    `) }
    `

})();


export const Children: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 1/-1;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    &>* {
        width: 48%;
    }
  
    @media only screen and (max-width: 768px) {
        align-items: stretch;
        flex-direction: column;
        
        &>* {
            width: 100%;
        }
    }
  `;
})();

// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const Container: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #b1b4b6;
    padding-top: 20px;
    flex-grow: 1;
    margin-right: 1rem;

    &:last-of-type {
        margin-right: 0
    }

    @media only screen and (max-width: 768px) {
        margin-right: 0
    }
  `;
})();

export const Caption: ComponentType<*> = (() => {
  return styled.h3`
    font-weight: bold;
    margin-top: 0;
    color: black;
    margin-bottom: 5px;
  `;
})();


export const Number: ComponentType<*> = (() => {
  return styled.span`
    margin-bottom: 10px;
    color: #367E93;
  `;
})();


export const HeadingCaption: ComponentType<*> = (() => {
  return styled.span`
    margin-top: 0;
    font-size: 18px;
    margin-bottom: 5px;
  `;
})();


export const Heading: ComponentType<*> = (() => {
  return styled.h2`
    margin-top: 0;
    color: black;
    font-size: 23px;
    margin-bottom: 5px;
  `;
})();


export const Children: ComponentType<*> = (() => {
  return styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    // width: 100%;
    margin-top: 1rem;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
  `;
})();

export const MainContainer: ComponentType<*> = (() => {

    return styled.section`
    grid-column: 1/-1;
    display: block;
    width: 100%;
    `

})();

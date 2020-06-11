import React from 'react';
import styled from 'styled-components';

import type { ComponentType } from 'react';


export const ModalContainer: ComponentType<*> = (() => {

    return styled.section`
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 99999999;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
  `;

})();


export const ModalContent: ComponentType<*> = (() => {

    return styled.article`
    display: flex;
    flex-direction: column;
    padding: 30px;
    max-height: min(80vh, 500px);
    max-width: 350px;
    min-width: 250px;
    border: 5px solid black;
    background-color: #fff;
    overflow-x: scroll;
    
    & > :first-child {
        margin-top: 0;
    }
  `;

})();


export const ModalOpener: ComponentType<*> = (() => {
    const
        classes = '',
        Node = styled.button`   
            cursor: pointer;
            outline: none;
                     
            &::before {
                position: relative;
                top: -5px;
                display: inline-block;
                width: 14px;
                height: 14px;
                border: 1px solid #1d70b8;
                margin-left: 5px;
                border-radius: 10px;
                color: #1d70b8;
                content: 'i';
                font-family: Verdana, sans-serif;
                font-size: 12px;
                font-weight: bold;
                text-align: center;
            }

            &:hover {
                &::before {
                    border-color: #1d70b8;
                    background: #1d70b8;
                    color: white;
                }
            }
        `;

    return ({ className="", ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const ModalCloser: ComponentType<*> = (() => {
    const
        classes = '',
        Node = styled.button`            
            margin-bottom: 0;
        `;

    return ({ className="", ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const Markdown: ComponentType<*> = (() => {

    const
        Node = styled.div`
            margin-bottom: 1em;
            overflow-x: scroll;
            font-size: 80%;

            & > :first-child {
                margin-top: 0;
            }            
        `;

    return ({ className, ...props }) =>
        <Node className={ `markdown ${className}` } { ...props }/>

})();

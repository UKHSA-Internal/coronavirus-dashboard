import React from 'react';
import styled from 'styled-components';

import type { ComponentType } from 'react';


export const ModalContainer: ComponentType<*> = (() => {

    return styled.section`
        display: flex;
        position: fixed;
        z-index: 99999999999;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        
        &::not(:focus-within) {
            background-color: rgb(255, 255, 254);
            transition: background-color 0.01s ease;
        }
  `;

})();


export const ModalContent: ComponentType<*> = (() => {

    return styled.article`
    display: flex;
    flex-direction: column;
    max-height: min(80vh, 500px);
    width: min(400px, 95vw);
    border: 5px solid black;
    background-color: #fff;
    
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
            border-bottom: 1px dashed #959595 !important;
            // word-wrap: normal;
            text-align: left;
            // display: contents;
            // font-weight: 600;
             
            &:active,
            &:hover {
                background-colour: #f1f1f1;
                border-bottom: 1px dashed #3e3e3e;
            }
        `;

    return ({ className="", ...props }) =>
        <Node className={ `${classes} ${className}` } role={ 'button' } { ...props }/>
})();


export const ModalCloser: ComponentType<*> = (() => {
    const
        classes = '',
        Node = styled.button` 
            min-height: 40px;
            margin: 20px 30px 30px 30px;
        `;

    return ({ className="", ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const Markdown: ComponentType<*> = (() => {

    const
        Node = styled.div`
            padding: 30px;
            overflow-x: scroll;
            font-size: 80%;
            border-bottom: 1px solid #6F777B;
            margin-bottom: 0;

            & > :first-child {
                margin-top: 0;
            }            
        `;

    return ({ className, ...props }) =>
        <Node className={ `modal markdown ${className}` } { ...props }/>

})();

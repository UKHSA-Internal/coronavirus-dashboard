// @flow

import styled from "styled-components";

import type { ComponentType } from "react";


// export const MapContainer: ComponentType<*> =
//     styled.div`
//         position: absolute;
//         border: 1px solid black;
//         height: 75vh;
//         margin: 0;
//     `;

export const MapContainer: ComponentType<*> =
    styled
        .div`
            position: relative;
            width: 100%;
            height: 75vh;
            
            #map {
                height: 75vh;
                width: 100%;
                border: 1px solid black;
            }
        `;


export const SliderContainer: ComponentType<*> =
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.9);
    border: 2px solid black;
    padding: 0.5rem 1rem;
    margin: 10px;
    width: 30%;
    left: 0;
    top: 0;
    
    &>label {
        margin-bottom: 0.5rem;
    }
    `;


export const MapToolbox: ComponentType<*> =
    styled.legend`
    font-family: "GDS Transport", Arial, sans-serif;
    position: absolute;
    background: rgba(255,255,255,0.9);
    border: 2px solid black;
    padding: 0.5rem;
    margin: 10px 10px;
    bottom: 0;
    left: 0;
    
    &>h2 {
        margin-top: 0;
    }
    
    &>h2>small {
        color: #636A6D;
        margin-top: 0;
        font-size: .9rem;
        display: block;
        font-weight: normal;
    }
    `;


export const NumberBox: ComponentType<*> =
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    margin-right: 1rem;
    &>h3 {
        margin: 0;
        font-size: 0.9rem !important;
        color: #636A6D;
    }
    
    &>p {
        margin-top: 0;
    }
    
    &>h2>small {
        color: #636A6D;
        margin-top: 0;
        font-size: .9rem;
        display: block;
        font-weight: normal;
    }
    `;


export const NumbersContainer: ComponentType<*> =
    styled.div`
    font-family: "GDS Transport", Arial, sans-serif;
    display: flex;
    flex-direction: row;
    `;
// @flow

import React, { Component } from 'react';
import numeral from 'numeral';

import type { Props } from './BigNumber.types.js';
import {
    Children,
    Container,
    Caption,
    Title,
    Number
} from './BigNumber.styles.js';


export const BigNumberContainer: Component<Props> = ({ children }) => {

    return <Children>{ children }</Children>


}; // BigNumberContainer


export const BigNumber: Component<Props> = ({ caption, number, title }: Props) => {
    return (
        <Container>
            <Caption>{ caption }</Caption>
            <Title>{ title }</Title>
            <Number>{ typeof number === 'number' ? numeral(number).format('0,0') : number }</Number>
        </Container>
    );
};

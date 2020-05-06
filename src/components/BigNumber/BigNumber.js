// @flow

import React, { Component } from 'react';
import numeral from 'numeral';

import type { Props } from './BigNumber.types.js';
import * as Styles from './BigNumber.styles.js';


export const BigNumberContainer: Component<Props> = ({ children }) => {

    return <Styles.MainContainer>
        <Styles.Children>{ children }</Styles.Children>
    </Styles.MainContainer>

}; // SmallNumberContainer


export const BigNumber: Component<Props> = ({ caption, number, description }: Props) => {
    return (
        <Styles.Container>
            <Styles.Caption className="govuk-caption-l">{ caption }</Styles.Caption>
            <Styles.Number
                className="govuk-heading-l">{ numeral(number).format('0,0') }</Styles.Number>
            <Styles.Description
                className="govuk-body govuk-!-font-size-16 govuk-!-margin-bottom-1">
                { description }
            </Styles.Description>
        </Styles.Container>
    );
};

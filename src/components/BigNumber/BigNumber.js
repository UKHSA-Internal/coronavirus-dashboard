// @flow

import React, { Component } from 'react';
import numeral from 'numeral';

import type { Props } from './BigNumber.types.js';
import * as Styles from './BigNumber.styles.js';


export const BigNumberContainer: Component<Props> = ({ children }) => {

    return <Styles.Children className={ "govuk-!-margin-top-5 govuk-!-margin-bottom-5" } >{ children }</Styles.Children>


}; // BigNumberContainer


export const BigNumber: Component<Props> = ({ caption, number, title }: Props) => {
    return (
        <Styles.Container className="govuk-!-padding-left-4 govuk-!-padding-right-4">
            <span className="govuk-caption-m">{ caption }</span>
            <h2 className="govuk-heading-s govuk-!-margin-bottom-0">
                { title }
            </h2>
            <h3 className="govuk-heading-l govuk-!-margin-bottom-2">
                { typeof number === 'number' ? numeral(number).format('0,0') : number }
            </h3>
        </Styles.Container>
    );
};

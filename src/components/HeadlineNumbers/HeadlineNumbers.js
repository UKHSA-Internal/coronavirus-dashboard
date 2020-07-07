// @flow

import React from "react";

import type { Props } from "./HeadlineNumbers.types";
import ValueBox from "components/ValueBox";

import { BodySection, HBodySection } from "./HeadlineNumbers.styles";

import { ComponentType } from "react";


export const NumericReports: ComponentType<Props> = ({ children, horizontal=false }: Props) => {

    if ( horizontal )
        return <HBodySection>{ children }</HBodySection>;

    return <BodySection>{ children }</BodySection>

}; // ValueItemContainer


const HeadlineNumbers: ComponentType<Props> = ({ params, headlineNumbers=[] }) => {

    return <NumericReports horizontal={ true }>{
        headlineNumbers?.map((item, index) =>
            <ValueBox params={ params }
                      key={ `headline-number-${index}` }
                      { ...item }/>
        ) ?? null
    }</NumericReports>

}; // HeadlineNumbers


export default HeadlineNumbers;

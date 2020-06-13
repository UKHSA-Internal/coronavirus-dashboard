// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';
import { Link } from "react-router-dom";

import ModalTooltip from "components/Modal";

import type { Props } from './Card.types';
import {
    HalfCard,
    HalfCardHeader,
    HalfCardHeading,
    HalfCardBody,
    FullCard,
    FullCardHeader,
    FullCardHeading,
    Caption,
    BodySection,
    SectionBreak,
    DataContainer,
    DataColour,
    Heading,
    DataNumbersContainer,
    DataPrimary,
    DataSecondary,
    DataLabel,
    Number,
    HBodySection
} from './Card.styles';
import numeral from 'numeral'
import ReactTooltip from "react-tooltip";


const VisualSection: ComponentType<Props> = ({ children }: Props) => {

    return <BodySection>
        { children }
    </BodySection>

}; // Visuals


// const NumericReports: ComponentType<Props> = ({ children }: Props) => {
//
//     return <HBodySection>
//         { children }
//     </HBodySection>
//
// }; // ValueItemContainer


const NumericReports: ComponentType<Props> = ({ children, horizontal=false }: Props) => {

    if ( horizontal )
        return <HBodySection>{ children }</HBodySection>;

    return <BodySection>{ children }</BodySection>

}; // ValueItemContainer


const ValueItem: ComponentType<Props> = ({
         caption, primaryLabel, primaryValue, primaryModal=null, primaryTooltip=null,
         primarySign=null, primaryModalReplacements={}, secondaryLabel=null,
         secondaryValue=null, secondaryModal=null, secondaryTooltip=null,
         secondarySign=null, secondaryModalReplacements={}, chart }: Props) => {

    const tipId = encodeURI(primaryLabel);

    return <DataContainer>
        { ( chart?.colour ?? null ) ? <DataColour colour={ chart.colour } /> : null }
        <Heading>{ caption }</Heading>
        <DataNumbersContainer>
            <DataPrimary>
                { primaryLabel && <DataLabel>{ primaryLabel }</DataLabel> }
                <Number>
                    { numeral(primaryValue).format("0,0") }{ primarySign }
                    <ModalTooltip
                        data-tip={ primaryTooltip }
                        data-for={ tipId }
                        markdownPath={ primaryModal }
                        replacements={ primaryModalReplacements }
                    >
                        <span className={ "govuk-visually-hidden" }>
                            More information on { primaryLabel }: { primaryTooltip }
                        </span>
                    </ModalTooltip>
                </Number>
            </DataPrimary>

        {
            secondaryLabel
                ? <DataSecondary>
                    { secondaryLabel && <DataLabel>{ secondaryLabel }</DataLabel> }
                    <Number>
                        { numeral(secondaryValue).format("0,0") }{ secondarySign }
                        <ModalTooltip
                            data-tip={ secondaryTooltip }
                            data-for={ tipId }
                            markdownPath={ secondaryModal }
                            replacements={ secondaryModalReplacements }
                        >
                            <span className={ "govuk-visually-hidden" }>
                                More information on { secondaryLabel }: { secondaryTooltip }
                            </span>
                        </ModalTooltip>
                    </Number>
                </DataSecondary>
                : null
        }
        </DataNumbersContainer>
        <ReactTooltip id={ tipId }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </DataContainer>

}; // ValueItem


const Card: ComponentType<Props> = ({ heading="Placeholder", caption="", fullWidth=false, children }: Props) => {

    if ( !fullWidth ) {
        return <HalfCard>
            <HalfCardHeader>
                <HalfCardHeading>{ heading }</HalfCardHeading>
                <Link to={ "tests" } className={ "govuk-link govuk-!-font-weight-bold govuk-link--no-visited-state" }>More
                    detail</Link>
            </HalfCardHeader>
            <SectionBreak/>
            <HalfCardBody>{ children }</HalfCardBody>
        </HalfCard>
    }

    return <FullCard>
        <FullCardHeader>
            <FullCardHeading>
                <Caption>{ caption }</Caption>
                { heading }
            </FullCardHeading>
        </FullCardHeader>
        { children }
    </FullCard>

};  // Card


export {
    Card,
    VisualSection,
    ValueItem,
    NumericReports,
};

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
    NumericData,
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


const NumericReports: ComponentType<Props> = ({ children, horizontal=false }: Props) => {

    if ( horizontal )
        return <HBodySection>{ children }</HBodySection>;

    return <BodySection>{ children }</BodySection>

}; // ValueItemContainer


const ValueItem: ComponentType<Props> = ({
         caption, primaryLabel, primaryValue, primaryModal=null, primaryTooltip=null,
         primarySign=null, primaryModalReplacements={}, secondaryLabel=null,
         secondaryValue=null, secondaryModal=null, secondaryTooltip=null,
         secondarySign=null, secondaryModalReplacements={}, chart={}, isEnabled=true,
                                             setChartState=() => null }: Props) => {

    const tipId = encodeURI(primaryLabel);

    return <DataContainer>
        {
            ( chart?.colour ?? false ) &&
            <DataColour role={ "button" }
                        data-for={ tipId }
                        data-tip={
                            `Click to ${ isEnabled ? "hide" : "show" } 
                            the "${ caption.toLowerCase() }" on the graph.`
                        }
                        onClick={ setChartState }
                        colour={ isEnabled ? chart.colour : "none" } />
        }
        <Heading>{ caption }</Heading>
        <DataNumbersContainer>
            <NumericData>
                { primaryLabel && <DataLabel>{ primaryLabel }</DataLabel> }
                <Number>
                    <ModalTooltip data-tip={ primaryTooltip }
                                  data-for={ tipId }
                                  markdownPath={ primaryModal }
                                  replacements={ primaryModalReplacements }>
                        { numeral(primaryValue).format("0,0") }{ primarySign }
                        <p className={ "govuk-visually-hidden" }>
                            Abstract information on { primaryLabel }: { primaryTooltip }<br/>
                            Click for additional details.
                        </p>
                    </ModalTooltip>
                </Number>
            </NumericData>

        {
            secondaryLabel
                ? <NumericData>
                    { secondaryLabel && <DataLabel>{ secondaryLabel }</DataLabel> }
                    <Number>
                        <ModalTooltip
                            data-tip={ secondaryTooltip }
                            data-for={ tipId }
                            markdownPath={ secondaryModal }
                            replacements={ secondaryModalReplacements }
                        >
                            { numeral(secondaryValue).format("0,0") }{ secondarySign }
                            <p className={ "govuk-visually-hidden" }>
                                Abstract information on { secondaryLabel }: { secondaryTooltip }<br/>
                                Click for additional details.
                            </p>
                        </ModalTooltip>
                    </Number>
                </NumericData>
                : null
        }
        </DataNumbersContainer>
        <ReactTooltip id={ tipId }
                      place={ "right" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </DataContainer>

}; // ValueItem


const Card: ComponentType<Props> = ({ heading="Placeholder", caption="", fullWidth=false, children }: Props) => {

    if ( !fullWidth ) {
        return <HalfCard>
            <HalfCardHeader>
                <HalfCardHeading>{ heading }</HalfCardHeading>
                <Link to={ heading.toLowerCase() } className={ "govuk-link govuk-!-font-weight-bold govuk-link--no-visited-state" }>
                    More detail
                </Link>
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

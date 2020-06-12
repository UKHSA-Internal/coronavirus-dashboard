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
    DataHeading,
    DataNumbersContainer,
    DataPrimary,
    DataSecondary,
    DataLabel,
    Number,
    ToolTip
} from './Card.styles';
import numeral from 'numeral'
import ReactTooltip from "react-tooltip";


const VisualSection: ComponentType<Props> = ({ children }: Props) => {

    return <BodySection>
        { children }
    </BodySection>

}; // Visuals


const ValueItemsSection: ComponentType<Props> = ({ children }: Props) => {

    return <BodySection>
        { children }
    </BodySection>

}; // ValueItemContainer


const ValueItem: ComponentType<Props> = ({
         caption, primaryLabel, primaryValue, primaryModal=null, primaryTooltip=null,
         primarySign=null, primaryModalReplacements={}, secondaryLabel=null,
         secondaryValue=null, secondaryModal=null, secondaryTooltip=null,
         secondarySign=null, secondaryModalReplacements={}, chart }: Props) => {

    const tipId = encodeURI(primaryLabel);

    return <DataContainer>
        { ( chart?.colour ?? null ) ? <DataColour colour={ chart.colour } /> : null }
        <DataHeading>{ caption }</DataHeading>
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
        <ReactTooltip id={ tipId } place={ "right" } className={ "tooltip" } effect={ "solid" }/>
    </DataContainer>

}; // ValueItem


const HalfWidthCard: ComponentType<Props> = ({ heading="Placeholder", children }: Props) => {

    return <HalfCard>
        <HalfCardHeader>
            <HalfCardHeading>{ heading }</HalfCardHeading>
            <Link to={ "tests"} className={ "govuk-link govuk-!-font-weight-bold govuk-link--no-visited-state" }>More detail</Link>
        </HalfCardHeader>
        <SectionBreak />
        <HalfCardBody>
            { children }
        </HalfCardBody>

    </HalfCard>

};


const FullWidthCard: ComponentType<Props> = ({ heading="Placeholder", caption, children }: Props) => {

    return <FullCard>
        <FullCardHeader>
            <FullCardHeading>
                <Caption>{ caption }</Caption>
                { heading }
            </FullCardHeading>
            <div>
                <form>
                    <fieldset className={ "govuk-fieldset" }>
                        <div className={ "govuk-radios govuk-radios--small govuk-radios--inline" }>
                            <div className={ "govuk-radios__item" }>
                                <input className={ "govuk-radios__input" } id="changed-name" name="changed-name" type="radio" value="month" />
                                <label className={ "govuk-label govuk-radios__label" } htmlFor="changed-name">By specimen date
                                </label>
                            </div>
                            <div className={ "govuk-radios__item" }>
                                <input className={ "govuk-radios__input" } id="changed-name-2" name="changed-name" type="radio" value="year" />
                                <label className={ "govuk-label govuk-radios__label" } htmlFor="changed-name-2">By reported date
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </FullCardHeader>

        { children }

    </FullCard>

}

export {
    HalfWidthCard,
    FullWidthCard,
    VisualSection,
    ValueItem,
    ValueItemsSection
};

// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Link } from "react-router-dom";

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


// const ToolTipDescription = ({ id, message }) => {
//
//     return
//
// };  // ToolTopDescription


const ValueItem: ComponentType<Props> = ({
         heading, primaryLabel="Daily", primaryValue, primaryModal=null, primaryDescription=null, primarySign=null,
         secondaryLabel=null, secondaryValue=null, secondaryModal=null, secondaryDescription=null, secondarySign=null,
         colourValue }: Props) => {

    const tipId = encodeURI(primaryLabel);

    return <DataContainer>
        { colourValue ? <DataColour colour={ colourValue } /> : null }
        <DataHeading>{ heading }</DataHeading>
        <DataNumbersContainer>
            <DataPrimary>
                <DataLabel>{ primaryLabel }</DataLabel>
                <Number>
                    { numeral(primaryValue).format("0,0") }{ primarySign }
                    <ToolTip data-tip={ primaryDescription } data-for={ tipId }>
                        <span className={ "govuk-visually-hidden" }>More information</span>
                    </ToolTip>
                </Number>
            </DataPrimary>

        {
            secondaryLabel
                ? <DataSecondary>
                    <DataLabel>{ secondaryLabel }</DataLabel>
                    <Number>
                        { numeral(secondaryValue).format("0,0") }{ secondarySign }
                        <ToolTip data-tip={ secondaryDescription } data-for={ tipId }>
                            <span className={ "govuk-visually-hidden" }>More information</span>
                        </ToolTip>
                    </Number>
                </DataSecondary>
                : null
        }
        </DataNumbersContainer>
        <ReactTooltip id={ tipId } place={ "top" } effect={ "solid" }/>
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

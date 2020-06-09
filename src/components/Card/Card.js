// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';
import { BackLink } from 'govuk-react-jsx';
import { Link } from "react-router-dom";

import type { Props } from './Card.types';
import {
    CardDescription,
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
    DataColour,
    DataLabel,
    LabelText,
    DataValue,
    Number
} from './Card.styles';
import numeral from 'numeral'


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


const ValueItem: ComponentType<Props> = ({ label, value, description=null, descriptionValue=null, descriptionSign=null, colourValue }: Props) => {

    return <Fragment>
        { colourValue ? <DataColour colour={ colourValue } /> : null }
        <DataLabel>
            <LabelText>{ label }</LabelText>
        </DataLabel>
        <DataValue>
            <Number>
                { numeral(value).format("0,0") }
                {
                    description
                        ? <CardDescription>{ description }:&nbsp;{ numeral(descriptionValue).format("0,0") }{descriptionSign}</CardDescription>
                        : null
                }
            </Number>
        </DataValue>
    </Fragment>

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

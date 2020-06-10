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

    return <div>
        { colourValue ? <DataColour colour={ colourValue } /> : null }
        <h3>{ heading }</h3>
        <div data-tip={ primaryDescription } data-for={ tipId }>
            <DataLabel>
                <h4>{ primaryLabel }</h4>
            </DataLabel>
            <DataValue>
                <Number>
                    { numeral(primaryValue).format("0,0") }{ primarySign }
                </Number>
            </DataValue>
        </div>
        {
            secondaryLabel
                ? <Fragment>
                    <div data-tip={ secondaryDescription } data-for={ tipId }>
                        <DataLabel>
                            <h4>{ secondaryLabel }</h4>
                        </DataLabel>
                        <DataValue>
                            <Number>
                                { numeral(secondaryValue).format("0,0") }{ secondarySign }
                            </Number>
                        </DataValue>
                    </div>
                </Fragment>
                : null
        }
        <ReactTooltip id={ tipId } place={ "top" } effect={ "solid" }/>
    </div>

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

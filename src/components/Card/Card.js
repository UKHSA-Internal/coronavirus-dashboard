// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';
import { BackLink } from 'govuk-react-jsx';
import { Link } from "react-router-dom";

import type { Props } from './Card.types';
import {
    CardDescription,
    CardBody,
    FullWidthCardBody,
    DataColour,
    DataLabel,
    DataValue
} from './Card.styles';
import numeral from 'numeral'


const VisualSection: ComponentType<Props> = ({ children }: Props) => {

    return <div className={ "govuk-grid-column-one-half container-map" }>
        { children }
        {/*<img src={ "/public/images/graph-tests.png" } width={ "100%" } alt={ "" }/>*/}
    </div>

}; // Visuals


const ValueItem: ComponentType<Props> = ({ label, value, description=null, descriptionValue=null, descriptionSign=null, colourValue }: Props) => {

    return <Fragment>
        { colourValue ? <DataColour colour={ colourValue } /> : null }
        <DataLabel>
            <p className={ "govuk-body govuk-!-margin-bottom-0" }>{ label }</p>
        </DataLabel>
        <DataValue className={ "govuk-!-margin-bottom-4" }>
            <h3 className={ "govuk-heading-m govuk-!-margin-bottom-2 govuk-!-padding-top-0" }>
                { numeral(value).format("0,0") }
                {
                    description
                        ? <CardDescription>{ description }:&nbsp;{ numeral(descriptionValue).format("0,0") }{descriptionSign}</CardDescription>
                        : null
                }
            </h3>
        </DataValue>
    </Fragment>

}; // ValueItem


const ValueItemsSection: ComponentType<Props> = ({ children }: Props) => {

    return <div className={ "govuk-grid-column-one-half" }>
        { children }
        <div className={ "spacer" }/>
    </div>

}; // ValueItemContainer


const HalfWidthCard: ComponentType<Props> = ({ caption="Placeholder", children }: Props) => {

    return <CardBody>
        <header className={ "util-flex util-flex-justify-between util-flex-align-items-center govuk-!-padding-bottom-2" }>
            <h2 className={ "govuk-heading-m govuk-!-margin-bottom-0" }>{ caption }</h2>
            <Link to={ "tests"} className={ "govuk-link govuk-!-font-weight-bold govuk-link--no-visited-state" }>More detail</Link>
        </header>

        <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-0 govuk-section-break--visible" }/>

        { children }

    </CardBody>

};


const FullWidthCard: ComponentType<Props> = ({ caption, children }: Props) => {

    return <FullWidthCardBody>
        <header className={ "util-flex util-flex-justify-between util-flex-align-items-center govuk-!-padding-bottom-2" }>
            <h2 className={ "govuk-heading-m govuk-!-margin-bottom-0" }>{ caption }</h2>
        </header>

        <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-0 govuk-section-break--visible" }/>

        { children }

    </FullWidthCardBody>

}

export {
    HalfWidthCard,
    FullWidthCard,
    VisualSection,
    ValueItem,
    ValueItemsSection
};

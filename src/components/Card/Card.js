// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';
import { BackLink } from 'govuk-react-jsx';

import type { Props } from './Card.types';
import * as Styles from './Card.styles';


const VisualSection: ComponentType<Props> = ({ children }: Props) => {

    return <div className={ "govuk-grid-column-one-half container-map" }>
        { children }
        {/*<img src={ "/public/images/graph-tests.png" } width={ "100%" } alt={ "" }/>*/}
    </div>

}; // Visuals


const ValueItem: ComponentType<Props> = ({ label, value, description=null, colourName }: Props) => {

    return <Fragment>
        <div className={ "data-label" }>
            <p className={ "govuk-body govuk-!-margin-bottom-0" }>{ label }</p>
        </div>
        <div className={ `square-${ colourName }` }/>
        <div className={ "data-value" }>
            <h3 className={ "govuk-heading-m govuk-!-margin-bottom-2 govuk-!-padding-top-0" }>
                { value }
                {
                    description
                        ? <small className={ "govuk-body-s govuk-!-margin-bottom-0 today" }>
                            { description }
                        </small>
                        : null
                }
            </h3>
        </div>
    </Fragment>

}; // ValueItem


const ValueItemsSection: ComponentType<Props> = ({ children }: Props) => {

    return <div className={ "govuk-grid-column-one-half" }>
        { children }
        <div className={ "spacer" }/>
    </div>

}; // ValueItemContainer


const HalfWidthCard: ComponentType<Props> = ({ caption="Placeholder", backUrl=null, children }: Props) => {

    return <Styles.Card classNameName={ "dashboard-panel" }>
        <div className={ "govuk-grid-row govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>
            <div className={ "govuk-grid-column-one-half" }>
                <h2 className={ "govuk-heading-m govuk-!-margin-bottom-1 govuk-!-margin-top-0" }>{ caption }</h2>
            </div>
            <div className={ "govuk-grid-column-one-half" }>
                    <span
                        className={ "govuk-caption-m govuk-body-s more-detail govuk-!-margin-bottom-0 govuk-!-margin-top-1" }>
                        <a className={ "govuk-link more-detail govuk-!-font-weight-bold govuk-link--no-visited-state govuk-!-margin-bottom-0" }
                           href={ "testing" }>More detail ►</a>
                    </span>
            </div>
        </div>

        <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-0 govuk-section-break--visible" }/>

        <div className={ "govuk-grid-row govuk-!-margin-top-0 govuk-!-margin-bottom-0" }>
            { children }
        </div>

    </Styles.Card>

};


const FullWidthCard: ComponentType<Props> = ({ caption, title, subtitle, backUrl }: Props) => {

}

export {
    HalfWidthCard,
    FullWidthCard,
    VisualSection,
    ValueItem,
    ValueItemsSection
};

// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { ArrowUp } from "common/Icons";
import * as Styles from './BackToTop.styles';
import type { Props } from './BackToTop.types';

import useBackToTopOverlayVisible from 'hooks/useBackToTopOverlayVisible';


const backToTopClickHandler = event => {

    event.preventDefault();

    window.scrollTo(0, 0);

}; // backToTopClickHandler


const BackToTopLink: ComponentType<Props> = () => {

    return <div className={ "govuk-width-container" }>
        <Styles.Link className={ "govuk-link govuk-link--no-visited-state" }
                     role={ "button" }
                     href={ "" }
                     onClick={ backToTopClickHandler }>
            <ArrowUp/>
            Back to top
        </Styles.Link>
    </div>

}; // BackToTopLink


/**
 * A govuk style back-to-top link component.
 *
 * This component can either appear as an 'overlay' stuck to the bottom of the
 * screen hovering over the content, or as an 'inline' link that sits between
 * other components in the vertical page flow.
 *
 * @param {string} mode Either 'overlay' or 'inline' to choose which style to
 * display this component.
 */
const BackToTop: ComponentType<Props> = ({ mode }: Props) => {

    const visible = useBackToTopOverlayVisible('footer');

    if ( mode === 'overlay' ) {

        return<Styles.OverlayContainer style={ { opacity: visible ? 1 : 0 } }>
            <BackToTopLink/>
        </Styles.OverlayContainer>

    } else {

        return <Styles.InlineContainer style={ { opacity: visible ? 0 : 1 } }>
            <BackToTopLink/>
        </Styles.InlineContainer>

    }

}; // BackToTop


export default BackToTop;

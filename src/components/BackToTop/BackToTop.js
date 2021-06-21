// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { ArrowUp } from "common/Icons";
import {
    OverlayContainer,
    InlineContainer,
    Link
} from './BackToTop.styles';
import type { Props } from './BackToTop.types';

import useBackToTopOverlayVisible from 'hooks/useBackToTopOverlayVisible';


const BackToTopLink: ComponentType<Props> = () => {

    return <Link href={ "#main-content" }>
        <ArrowUp/>
        Back to top
    </Link>

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

    if ( mode === 'overlay' && visible ) {

        return<OverlayContainer tabIndex={ "-1" }
                                role={ "complementary" }
                                aria-label={ "Scroll back to top" }
                                style={ { opacity: visible ? 1 : 0, tabIndex: visible ? 0 : -1 } }>
            <BackToTopLink/>
        </OverlayContainer>

    } else if ( mode !== 'overlay' ) {

        return <InlineContainer tabIndex={ "-1" }
                                role={ "complementary" }
                                aria-label={ "Scroll back to top" }
                                style={ { opacity: visible ? 0 : 1, tabIndex: visible ? -1 : 0  } }>
            <BackToTopLink/>
        </InlineContainer>

    }

    return null

}; // BackToTop


export default BackToTop;

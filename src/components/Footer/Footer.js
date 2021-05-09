// @flow

import React from "react";

import { Footer as GovUKFooter } from "govuk-react-jsx";

import type { ComponentType } from "react";


const FooterContents: ComponentType<*> = () => (
    <>
        <p className={ "govuk-footer__meta-custom" }>
            For feedback email&nbsp;
            <a className="govuk-footer__link"
               href={ encodeURI("mailto:coronavirus-tracker@phe.gov.uk?Subject=Dashboard feedback") }
               rel="noopener noreferrer"
               target="_blank"
            >coronavirus-tracker@phe.gov.uk</a>
        </p>
        <p className={ "govuk-footer__meta-custom" }>
            Developed by&nbsp;
            <a className="govuk-footer__link"
               href="https://www.gov.uk/government/organisations/public-health-england"
               target="_blank"
               rel="noopener noreferrer"
            >Public Health England</a>.
        </p>
    </>
);  // FooterContents


const Footer = () => (
    <GovUKFooter
        meta={ {
            children: <FooterContents/>,
            items: [
                // { children: ['Archive'], href: '/archive' },
                { children: ['Accessibility'], href: '/details/accessibility' },
                { children: ['Cookies'], href: '/details/cookies' }
            ],
            visuallyHiddenTitle: 'Items',
        } }
    />
);  // Footer


export default Footer;

// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Footer } from 'govuk-react-jsx/govuk/components/footer';

import Header from 'components/Header';
import Navigation from 'components/Navigation';

import type { Props } from './Layout.types.js';

const Layout: ComponentType<Props> = ({ pathname, children }: Props) => {
  return (
    <>
      <Header />
      <Navigation pathname={pathname} />
      {children}
      <Footer
        meta={{
          children: [
            'For feedback email ',
            <a className="govuk-footer__link" href="mailto:coronavirus-tracker@phe.gov.uk?Subject=Coronavirus%20dashboard%20feedback" rel="noopener noreferrer" target="_blank">coronavirus-tracker@phe.gov.uk</a>,
            <br />,
            <br />,
            'Developed by ',
            <a className="govuk-footer__link" href="https://www.gov.uk/government/organisations/public-health-england" target="_blank" rel="noopener noreferrer">PHE</a>,
            ' and ',
            <a className="govuk-footer__link" href="https://www.nhsx.nhs.uk/" target="_blank" rel="noopener noreferrer">NHSX</a>,
          ],
          items: [
            { children: ['Accessibility'], href: '/accessibility' },
          ],
          visuallyHiddenTitle: 'Items',
        }}
      />
    </>
  );
};

export default Layout;

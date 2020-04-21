// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Footer } from 'govuk-react-jsx/govuk/components/footer';
import { Helmet } from 'react-helmet';

import CookieBanner from 'components/CookieBanner';
import Header from 'components/Header';
import Navigation from 'components/Navigation';

import type { Props } from './Layout.types.js';

const Layout: ComponentType<Props> = ({ pathname, children }: Props) => {
  return (
    <>
      <Helmet>
        <base href={process.env.BASE_URL} />
        <script>
          {`
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          `}
        </script>
      </Helmet>
      <CookieBanner />
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
            { children: ['Cookies'], href: '/cookies' },
          ],
          visuallyHiddenTitle: 'Items',
        }}
      />
    </>
  );
};

export default Layout;

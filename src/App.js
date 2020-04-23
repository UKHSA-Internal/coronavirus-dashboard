/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Header, Footer } from 'govuk-react-jsx';

import useResponsiveLayout from 'hooks/useResponsiveLayout';
import Regional from 'pages/Regional';
import MobileRegionTable from 'pages/MobileRegionTable';
import About from 'pages/About';
import Accessibility from 'pages/Accessibility';
import Cookies from 'pages/Cookies';
import Navigation from 'components/Navigation';
import CookieBanner from 'components/CookieBanner';

const F = props => <Footer
  {...props}
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
      { children: ['Cookies'], href: '/cookies' }
    ],
    visuallyHiddenTitle: 'Items',
  }}
/>;

const App = () => {
  const layout = useResponsiveLayout(768);

  return (
    <>
      <CookieBanner />
      <Header
        // containerClassName="govuk-header__container--full-width"
        // navigationClassName="govuk-header__navigation--end"
        serviceName="Coronavirus (COVID-19) cases in the UK"
        serviceUrlTo="/"
        homepageUrlHref="https://gov.uk"
      />
      <Navigation />
      <Switch>
        <Route path="/region" component={MobileRegionTable} />
        <Route path="/about" component={About} />
        <Route path="/accessibility" component={Accessibility} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/" component={Regional} />
        <Redirect to="/" />
      </Switch>
      <Switch>
        <Route path="/" exact component={F} />
        <Route path="/about" exact component={F} />
        <Route path="/accessibility" exact component={F} />
        <Route path="/cookies" exact component={F} />
      </Switch>
    </>
  );
}

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Header, Footer } from 'govuk-react-jsx';

import useResponsiveLayout from 'hooks/useResponsiveLayout';
import Overview from 'pages/Overview';
import Regional from 'pages/Regional';
import SingleRegion from 'pages/SingleRegion';
import Navigation from 'components/Navigation';

const App = () => {
  const layout = useResponsiveLayout(768);
  return (
    <>
      <Header
        containerClassName="govuk-header__container--full-width"
        navigationClassName="govuk-header__navigation--end"
        serviceName="Track coronavirus (COVID-19)"
        serviceUrl="/overview"
      />
      {/* <Navigation /> */}
      <Switch>
        {/* <Route path="/uk" component={Overview} /> */}
        <Route path="/country/:country" component={SingleRegion} />
        <Route path="/nhs-region/:nhsRegion" component={SingleRegion} />
        <Route path="/local-authority/:localAuthority" component={SingleRegion} />
        <Route path="/" component={Regional} />
        <Redirect to="/" />
      </Switch>
      <Switch>
        {/* <Route path="/uk" component={Footer} /> */}
        <Route path="/country/:country" component={Footer} />
        <Route path="/nhs-region/:nhsRegion" component={Footer} />
        <Route path="/local-authority/:localAuthority" component={Footer} />
        <Route path="/" component={layout ==='desktop' && Footer} />
      </Switch>
    </>
  );
}

export default App;

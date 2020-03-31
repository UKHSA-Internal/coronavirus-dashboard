/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Header, Footer } from 'govuk-react-jsx';

import Regional from 'pages/Regional';
import MobileRegionTable from 'pages/MobileRegionTable';
import About from 'pages/About';
import Navigation from 'components/Navigation';

const App = () => {
  return (
    <>
      <Header
        // containerClassName="govuk-header__container--full-width"
        // navigationClassName="govuk-header__navigation--end"
        serviceName="Track coronavirus (COVID-19)"
        serviceUrl="/overview"
      />
      <Navigation />
      <Switch>
        <Route path="/region" component={MobileRegionTable} />
        <Route path="/about" component={About} />
        <Route path="/" component={Regional} />
        <Redirect to="/" />
      </Switch>
      <Switch>
        <Route path="/" exact component={Footer} />
      </Switch>
    </>
  );
}

export default App;

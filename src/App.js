/* eslint-disable react-hooks/exhaustive-deps */
import React,  { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Header, Footer } from 'govuk-react-jsx';

import Regional from 'pages/Regional';
import MobileRegionTable from 'pages/MobileRegionTable';
import About from 'pages/About';
import Archive from "pages/Archive";
import Accessibility from 'pages/Accessibility';
import Cookies from 'pages/Cookies';
import Navigation from 'components/Navigation';
import CookieBanner from 'components/CookieBanner';
import BackToTop from 'components/BackToTop';


const FooterContents = () => {

    return <Fragment>
        <p className={ "govuk-footer__meta-custom" }>
            For feedback email&nbsp;
            <a className="govuk-footer__link"
               href="mailto:coronavirus-tracker@phe.gov.uk?Subject=Coronavirus%20dashboard%20feedback"
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
            >PHE</a>
            &nbsp;and&nbsp;
            <a className="govuk-footer__link"
               href="https://www.nhsx.nhs.uk/"
               target="_blank"
               rel="noopener noreferrer"
            >NHSX</a>
        </p>
    </Fragment>

}; // FooterContents


const F = props => <Footer
    { ...props }
    meta={ {
        children: <FooterContents/>,
        items: [
            { children: ['Archive'], href: '/archive' },
            { children: ['Accessibility'], href: '/accessibility' },
            { children: ['Cookies'], href: '/cookies' }
        ],
        visuallyHiddenTitle: 'Items',
    } }
/>;


const App = () => {

    return (
        <>
            <CookieBanner/>
            <Header
                // containerClassName="govuk-header__container--full-width"
                // navigationClassName="govuk-header__navigation--end"
                serviceName="Coronavirus (COVID-19) cases in the UK"
                serviceUrlTo="/"
                homepageUrlHref="https://gov.uk"
            />
            <Navigation/>

            {/* We only want back-to-top links on the main & about pages. */}
            <Switch>
                {/* These back-to-top links are the 'overlay' style that stays
                    on screen as we scroll. */}
                <Route path="/about" exact render={()=>(<BackToTop mode="overlay"/>)} />
                <Route path="/" exact render={()=>(<BackToTop mode="overlay"/>)} />
            </Switch>

            <Switch>
                <Route path="/region" component={ MobileRegionTable }/>
                <Route path="/about" component={ About }/>
                <Route path="/accessibility" component={ Accessibility }/>
                <Route path="/cookies" component={ Cookies }/>
                <Route path="/archive" component={ Archive }/>
                <Route path="/" component={ Regional }/>
                <Redirect to="/"/>
            </Switch>

            {/* We only want back-to-top links on the main & about pages. */}
            <Switch>
                {/* These back-to-top links are the 'inline' style that sits
                    statically between the end of the content and the footer. */}
                <Route path="/about" exact render={()=>(<BackToTop mode="inline"/>)} />
                <Route path="/" exact render={()=>(<BackToTop mode="inline"/>)} />
            </Switch>

            <Switch>
                <Route path="/" exact component={ F }/>
                <Route path="/about" exact component={ F }/>
                <Route path="/accessibility" exact component={ F }/>
                <Route path="/cookies" exact component={ F }/>
                <Route path="/archive" exact component={ F }/>
            </Switch>
        </>
    );
}


export default App;

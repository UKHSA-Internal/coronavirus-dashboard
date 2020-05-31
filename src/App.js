/* eslint-disable react-hooks/exhaustive-deps */

import React,  { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Header, Footer } from 'govuk-react-jsx';

import dotenv from 'dotenv';

import About from 'pages/About';
import Archive from "pages/Archive";
import Accessibility from 'pages/Accessibility';
import Cookies from 'pages/Cookies';
import DailySummary from 'pages/DailySummary';
import Tests from 'pages/Tests';
import Cases from 'pages/Cases';
import Healthcare from 'pages/Healthcare';
import Deaths from 'pages/Deaths';
import CookieBanner from 'components/CookieBanner';
import BackToTop from 'components/BackToTop';
import ErrorBoundary from "components/ErrorBoundary";
import axios from "axios";
import URLs from "./common/urls";
import moment from "moment";
import SideNavigation from "./components/SideNavigation/SideNavigation";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";

// get environment vars
dotenv.config();


(async () => {

    const { data } = await axios.get(URLs.timestamp, { responseType: 'text' })

    sessionStorage.setItem("lastUpdate", data)

})();

const LastUpdateTime = () => {

    const timestamp = sessionStorage.getItem('lastUpdate');

    if (!timestamp) return null;

    return <p className={ "govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-5" }>
        Last updated on { moment(timestamp).format("dddd D MMMM YYYY [at] h:mma") }
    </p>


}

const FooterContents = () => {

    return <Fragment>
        <p className={ "govuk-footer__meta-custom" }>
            For feedback email&nbsp;
            <a className="govuk-footer__link"
               href={encodeURI("mailto:coronavirus-tracker@phe.gov.uk?Subject=Coronavirus dashboard feedback")}
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


const F = () => <Footer

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

    return <Fragment>
        <CookieBanner/>
        <Header
            // containerClassName="govuk-header__container--full-width"
            // navigationClassName="govuk-header__navigation--end"
            serviceName="Coronavirus (COVID-19) cases in the UK"
            serviceUrlTo="/"
            homepageUrlHref="https://gov.uk"
        />

        <div className={ "govuk-width-container" }>
            <main className={ "govuk-main-wrapper" } role={ "main" }>
                <ErrorBoundary>
                    <div className={ "govuk-grid-row" }>
                        <div className={ "govuk-grid-column-full" }>
                            <Switch>
                                <Route path={ "/" } component={ LastUpdateTime }/>
                            </Switch>
                            <div className={ "govuk-grid-column-menu" }>
                                <Switch>
                                    <Route path={ "/" } component={ SideNavigation }/>
                                </Switch>
                            </div>
                            <div className={ "govuk-grid-column-dashboard" }>
                                <DashboardHeader title={ "Daily Summary" } />
                                <Switch>
                                    {/* These back-to-top links are the 'overlay' style that stays on screen as we scroll. */}
                                    <Route path="/" render={ () => <BackToTop mode={ "overlay" }/> } />
                                </Switch>

                                <Switch>
                                    <Route path="/about-data" component={ About }/>
                                    <Route path="/accessibility" component={ Accessibility }/>
                                    <Route path="/cookies" component={ Cookies }/>
                                    <Route path="/archive" component={ Archive }/>
                                    <Route path="/tests" component={ Tests }/>
                                    <Route path="/cases" component={ Cases }/>
                                    <Route path="/healthcare" component={ Healthcare }/>
                                    <Route path="/deaths" component={ Deaths }/>
                                    <Route path="/" component={ DailySummary }/>
                                    <Redirect to="/"/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </ErrorBoundary>
            </main>
        </div>

        {/* We only want back-to-top links on the main & about pages. */}
        <Switch>
            {/* These back-to-top links are the 'inline' style that sits
                statically between the end of the content and the footer. */}
            {/*<Route path="/about-data" exact render={ props => <BackToTop {...props} mode="inline"/> } />*/}
            <Route path="/" render={ props => <BackToTop {...props} mode="inline"/>  } />
        </Switch>

        <Switch>
            <Route path="/" component={ F }/>
        </Switch>
    </Fragment>
}


export default App;

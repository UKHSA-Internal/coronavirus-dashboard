/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { Header, Footer } from 'govuk-react-jsx';

import dotenv from 'dotenv';

import About from 'pages/About';
import Archive from "pages/Archive";
import Accessibility from 'pages/Accessibility';
import Cookies from 'pages/Cookies';
import DailySummary from 'pages/DailySummary';
import Tests from 'pages/Testing';
import Cases from 'pages/Cases';
import Healthcare from 'pages/Healthcare';
import Deaths from 'pages/Deaths';
import CookieBanner from 'components/CookieBanner';
import BackToTop from 'components/BackToTop';
import ErrorBoundary from "components/ErrorBoundary";
import axios from "axios";
import URLs from "common/urls";
import moment from "moment";
import SideNavigation from "components/SideNavigation";
import SideNavMobile from "components/SideNavMobile";
import DashboardHeader from "components/DashboardHeader";

// get environment vars
dotenv.config();


const useTimestamp = () => {

    const [ timestamp, setTimestamp ] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(URLs.timestamp, { responseType: 'text' })
            setTimestamp(data)
        })();
    }, []);

    return timestamp

};  // useTimestamp


const LastUpdateTime = () => {

    const timestamp = useTimestamp();

    if (!timestamp) return null;

    return <p className={ "govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-5" }>
        Last updated on&nbsp;{
            moment(timestamp)
                .local(true)
                .format("dddd D MMMM YYYY [at] h:mma")
        }
    </p>

}; // LastUpdateTime


const FooterContents = () => (
    <Fragment>
        <p className={ "govuk-footer__meta-custom" }>
            For feedback email&nbsp;
            <a className="govuk-footer__link"
               href={ encodeURI("mailto:coronavirus-tracker@phe.gov.uk?Subject=Coronavirus dashboard feedback") }
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
);  // FooterContents


const F = () => (
    <Footer
        meta={ {
            children: <FooterContents/>,
            items: [
                { children: ['Archive'], href: '/archive' },
                { children: ['Accessibility'], href: '/accessibility' },
                { children: ['Cookies'], href: '/cookies' }
            ],
            visuallyHiddenTitle: 'Items',
        } }
    />
);  // Footer


const PathWithSideMenu = [
    "/",
    "/testing",
    "/cases",
    "/healthcare",
    "/deaths",
    "/about-data"
];

const App = ({ location: { pathname } }) => {

    const hasMenu = PathWithSideMenu.indexOf(pathname) > -1;

    return <Fragment>
        <CookieBanner/>
        <Header
            // containerClassName="govuk-header__container--full-width"
            // navigationClassName="govuk-header__navigation--end"
            serviceName="Coronavirus (COVID-19) in the UK"
            serviceUrlTo="/"
            homepageUrlHref="https://gov.uk"
        />
        <SideNavMobile/>
        <div className={ "govuk-width-container" }>
            <main className={ "govuk-main-wrapper" } role={ "main" }>
                <ErrorBoundary>
                    <Route path={ "/" } component={ hasMenu ? LastUpdateTime : null }/>
                    <div className={ "dashboard-container" }>
                        <div className={ "dashboard-menu" }>
                            <Switch>
                                <Route path={ "/" } component={ hasMenu ? SideNavigation : null }/>
                            </Switch>
                        </div>
                        <div className={ "dashboard-content" }>
                            <DashboardHeader/>

                            <Switch>
                                <Route path="/" exact component={ DailySummary }/>
                                <Route path="/testing" component={ Tests }/>
                                <Route path="/cases" component={ Cases }/>
                                <Route path="/healthcare" component={ Healthcare }/>
                                <Route path="/deaths" component={ Deaths }/>
                                <Route path="/about-data" component={ About }/>

                                <Route path="/archive" component={ Archive }/>
                                <Route path="/accessibility" component={ Accessibility }/>
                                <Route path="/cookies" component={ Cookies }/>
                            </Switch>
                        </div>
                    </div>
                </ErrorBoundary>
            </main>
        </div>

        <Switch>
            {/* These back-to-top links are the 'overlay' style that stays on screen as we scroll. */ }
            <Route path="/" render={ () => <BackToTop mode={ "overlay" }/> }/>
        </Switch>

        {/* We only want back-to-top links on the main & about pages. */ }
        <Switch>
            {/* These back-to-top links are the 'inline' style that sits
                statically between the end of the content and the footer. */ }
            <Route path="/" render={ props => <BackToTop { ...props } mode="inline"/> }/>
        </Switch>

        <Switch>
            <Route path="/" component={ F }/>
        </Switch>
    </Fragment>
};  // App


export default withRouter(App);

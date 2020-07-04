/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { Header, Footer } from 'govuk-react-jsx';

import About from 'pages/About';
import Accessibility from 'pages/Accessibility';
import Cookies from 'pages/Cookies';
import DailySummary from 'pages/DailySummary';
import CookieBanner from 'components/CookieBanner';
import BackToTop from 'components/BackToTop';
import ErrorBoundary from "components/ErrorBoundary";
import axios from "axios";
import URLs from "common/urls";
import moment from "moment";
// import SideNavigation from "components/SideNavigation";
import DashboardHeader from "components/DashboardHeader";
import useResponsiveLayout from "./hooks/useResponsiveLayout";
import Announcement from "./components/Announcement";


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

    return <>
        <Announcement firstDisplayDate={{ day: 15, month: 6, year: 2020 }} lastDisplayDate={{ day: 1, month: 1, year: 2021 }}>
            <p className={ "govuk-body govuk-!-margin-top-0" }>
                We are working to fix a number of technical issues and will add
                sub-national data as soon as possible.
            </p>
        </Announcement>
        <p className={ "govuk-body-s govuk-!-margin-top-5 govuk-!-margin-bottom-5" }>
            Last updated on&nbsp;<time dateTime={ timestamp }>{
                moment(timestamp)
                    .local(true)
                    .format("dddd D MMMM YYYY [at] h:mma")
            }</time>
        </p>
    </>

}; // LastUpdateTime


const FooterContents = () => (
    <Fragment>
        <p className={ "govuk-footer__meta-custom" }>
            For feedback email&nbsp;
            <a className="govuk-footer__link"
               href={ encodeURI("mailto:coronavirus-tracker@phe.gov.uk?Subject=BETA dashboard feedback") }
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
            >Public Health England</a>
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
                // { children: ['Archive'], href: '/archive' },
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


const BetaBanner = ({ ...props }) => {

    return <div className={ "govuk-phase-banner" }
                style={{ padding: "1rem" }} { ...props }>
        <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">
                beta
            </strong>
            <span className="govuk-phase-banner__text">
                This is a new service &ndash; your&nbsp;
                <a className="govuk-footer__link"
                   href={ encodeURI("mailto:coronavirus-tracker@phe.gov.uk?Subject=BETA dashboard feedback") }
                   rel={ "noopener noreferrer" }
                   target={ "_blank" }>
                    feedback</a>&nbsp;
                will help us to improve it.
                We currently show UK data only. Sub-national data will be added
                soon. The&nbsp;<a className="govuk-footer__link"
                   href={ "https://coronavirus.data.gov.uk/" }
                   rel={ "noopener noreferrer" }
                   target={ "_blank" }>current official website</a>&nbsp;is still
                available.</span>
        </p>
    </div>

};


const Navigation = ({ layout, ...props }) => {

    const Nav = layout !== "mobile"
        ? React.lazy(() => import('components/SideNavigation'))
        : React.lazy(() => import('components/SideNavMobile'));

    return <Suspense fallback={ <Loading/> }>
        <Nav { ...props }/>
    </Suspense>

};  // MobileNavigation


const
    Cases = lazy(() => import('pages/Cases')),
    Healthcare = lazy(() => import('pages/Healthcare')),
    Deaths = lazy(() => import('pages/Deaths')),
    Tests = lazy(() => import('pages/Testing'));


const App = ({ location: { pathname } }) => {

    const
        hasMenu = PathWithSideMenu.indexOf(pathname) > -1,
        layout = useResponsiveLayout(768);

    return <Fragment>
        <CookieBanner/>
        <Header
            // containerClassName="govuk-header__container--full-width"
            // navigationClassName="govuk-header__navigation--end"
            serviceName="Coronavirus (COVID-19) in the UK"
            serviceUrlTo="/"
            homepageUrlHref="https://gov.uk"
        />
        { layout === "mobile" && <Navigation layout={ layout }/> }
        <BetaBanner/>
        <div className={ "govuk-width-container" }>
            <main className={ "govuk-main-wrapper" } role={ "main" }>
                <ErrorBoundary>
                    <Route path={ "/" } component={ hasMenu ? LastUpdateTime : null }/>
                    <div className={ "dashboard-container" }>
                        {
                            layout === "desktop" &&
                            <aside className={ "dashboard-menu" }>
                                <Switch>
                                    <Route path={ "/" } render={ props => <Navigation layout={ layout } { ...props}/> }/>
                                </Switch>
                            </aside>
                        }
                        <div className={ "dashboard-content" }>
                            <DashboardHeader/>

                            <Switch>
                                <Suspense fallback={ <Loading/> }>
                                    <Route path="/" exact component={ DailySummary }/>
                                    <Route path="/testing" component={ Tests }/>
                                    <Route path="/cases" component={ Cases }/>
                                    <Route path="/healthcare" component={ Healthcare }/>
                                    <Route path="/deaths" component={ Deaths }/>
                                    <Route path="/about-data" component={ About }/>

                                    {/*<Route path="/archive" component={ Archive }/>*/}
                                    <Route path="/accessibility" component={ Accessibility }/>
                                    <Route path="/cookies" component={ Cookies }/>
                                </Suspense>
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

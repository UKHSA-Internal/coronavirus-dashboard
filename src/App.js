/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Header from "components/Header";
import DailySummary from 'pages/DailySummary';
import CookieBanner from 'components/CookieBanner';
import BackToTop from 'components/BackToTop';
import ErrorBoundary from "components/ErrorBoundary";
import axios from "axios";
import URLs from "common/urls";
import moment from "moment";
import useResponsiveLayout from "./hooks/useResponsiveLayout";
import Loading from "components/Loading";
import Announcement from "components/Announcement";

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

    return <>
        <Announcement firstDisplayDate={{ day: 15, month: 6, year: 2020 }}
                      lastDisplayDate={{ day: 1, month: 1, year: 2021 }}>
            <p className={ "govuk-body govuk-!-margin-top-0" }>
                This website is moving into production and will replace
                the <a className={ "govuk-link govuk-link--no-visited-state" }
                       href={ 'https://coronavirus.data.gov.uk/' }>official website</a>. Please
                read <Link className={ "govuk-link govuk-link--no-visited-state" }
                          to={ '/new-service' }>the announcement</Link> to learn more
                about how this change might affect you or your service.
            </p>
        </Announcement>
        <div className={ "govuk-!-margin-top-5 govuk-!-margin-bottom-5" }
             role={ "region" }
             aria-labelledby={ "last-update" }>
            <p className={ "govuk-body-s" } id={ "last-update" }>
                Last updated on&nbsp;{
                    !timestamp
                        ? <Loading/>
                        : <time dateTime={ timestamp }>{
                            moment(timestamp)
                                .local(true)
                                .format("dddd D MMMM YYYY [at] h:mma")
                        }</time>
                }
            </p>
        </div>
    </>

}; // LastUpdateTime


const
    PathWithSideMenu = [
        "/",
        "/testing",
        "/cases",
        "/healthcare",
        "/deaths",
        "/about-data"
    ];


const BetaBanner = ({ ...props }) => {

    return <div className={ "govuk-phase-banner" }
                style={{ padding: "1rem" }}
                role={ "region" }
                aria-label={ "Phase banner" }
                { ...props }>
        <p className="govuk-phase-banner__content" id={ "phase-banner-content" }>
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
                The&nbsp;<a className="govuk-footer__link"
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
    DashboardHeader = lazy(() => import('components/DashboardHeader')),
    Cases           = lazy(() => import('pages/Cases')),
    Healthcare      = lazy(() => import('pages/Healthcare')),
    Deaths          = lazy(() => import('pages/Deaths')),
    Tests           = lazy(() => import('pages/Testing')),
    About           = lazy(() => import('pages/About')),
    Accessibility   = lazy(() => import('pages/Accessibility')),
    Cookies         = lazy(() => import('pages/Cookies')),
    ApiDocs         = lazy(() => import('pages/ApiDocs')),
    NewWebsite      = lazy(() => import('pages/NewWebsite')),
    Footer          = lazy(() => import('components/Footer'));


const App = ({ location: { pathname } }) => {

    const
        layout = useResponsiveLayout(768);

    let hasMenu;

    useEffect(() => {

        hasMenu = PathWithSideMenu.indexOf(pathname) > -1;

    }, [ pathname ]);

    return <>
        <CookieBanner/>
        <Header/>
        { layout === "mobile" && <Navigation layout={ layout }/> }
        <BetaBanner/>
        <div className={ "govuk-width-container" }>
            <LastUpdateTime/>
            <ErrorBoundary>
                <div className={ "dashboard-container" }>
                    {
                        layout === "desktop" &&
                        <aside className={ "dashboard-menu" }>
                            <Switch>
                                <Route path={ "/" }
                                       render={ props => <Navigation layout={ layout } { ...props}/> }/>
                            </Switch>
                        </aside>
                    }
                    <main className={ "govuk-main-wrapper" } role={ "main" } id={ 'main-content' }>
                        <Suspense fallback={ <Loading/> }>
                            <DashboardHeader/>
                            <Switch>
                                <Route path="/" exact component={ DailySummary }/>
                                <Route path="/testing" component={ Tests }/>
                                <Route path="/cases" exact component={ Cases }/>
                                <Route path="/healthcare" component={ Healthcare }/>
                                <Route path="/deaths" component={ Deaths }/>

                                <Route path="/about-data" component={ About }/>
                                {/*<Route path="/archive" component={ Archive }/>*/}
                                <Route path="/accessibility" component={ Accessibility }/>
                                <Route path="/cookies" component={ Cookies }/>
                                <Route path="/developers-guide" exact component={ ApiDocs }/>
                                <Route path="/new-service" exact component={ NewWebsite }/>
                            </Switch>
                        </Suspense>
                    </main>
                </div>
            </ErrorBoundary>

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
        </div>

        <Switch>
            <Suspense fallback={ <Loading/> }>
                <Route path="/" component={ Footer }/>
            </Suspense>
        </Switch>
    </>
};  // App


export default withRouter(App);

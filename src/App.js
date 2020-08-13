/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import Header from "components/Header";
import DailySummary from 'pages/DailySummary';
// import CookieBanner from 'components/CookieBanner';
import BackToTop from 'components/BackToTop';
import ErrorBoundary from "components/ErrorBoundary";
import axios from "axios";
import URLs from "common/urls";
import moment from "moment";
import useResponsiveLayout from "./hooks/useResponsiveLayout";
import Loading from "components/Loading";

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
    Announcement    = lazy(() => import("components/Announcement")),
    Footer          = lazy(() => import('components/Footer'));


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
        <Suspense fallback={ <Loading/> }>
            <Announcement firstDisplayDate={{ year: 2020, month: 8, day: 9, hour: 12 }}
                          lastDisplayDate={{ year: 2020, month: 8, day: 12, hour: 8 }}>
                <p className={ "govuk-body" }>
                    This is a new service &mdash; please complete a
                    brief <a href={ "https://forms.gle/NkBM5dVXgYCkryE17" }
                             className={ "govuk-link" }
                             target={ "_blank" }
                             rel={ "noopener noreferrer" }>survey</a> to
                    help us improve it.
                </p>
            </Announcement>
            <Announcement firstDisplayDate={{ year: 2020, month: 8, day: 11, hour: 16 }}
                          lastDisplayDate={{ year: 2020, month: 8, day: 17, hour: 15, minute: 59 }}>
                <p className={ "govuk-body" }>
                    Data for deaths limited to those that occurred within 28 days of the
                    first laboratory&ndash;confirmed test are included for the UK from today.
                    The data on old and new measures can be
                    downloaded <a href={ "https://www.gov.uk/government/publications/phe-data-series-on-deaths-in-people-with-covid-19-technical-summary" }
                                  className={ "govuk-link" }
                                  target={ "_blank" }
                                  rel={ "noopener noreferrer" }>here</a>.
                </p>
            </Announcement>
            <Announcement firstDisplayDate={{ year: 2020, month: 8, day: 13, hour: 15, minute: 0 }}
                          lastDisplayDate={{ year: 2020, month: 8, day: 14, hour: 15, minute: 59 }}>
                <p className={ "govuk-body" }>
                    We have not received the latest data for cases and tests in England. We
                    will update today's records as soon as they become available.<br/>The deaths
                    page is being re&ndash;developed.
                </p>
            </Announcement>
        </Suspense>
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


const Navigation = ({ layout, ...props }) => {

    const Nav = layout !== "mobile"
        ? React.lazy(() => import('components/SideNavigation'))
        : React.lazy(() => import('components/SideNavMobile'));

    return <Suspense fallback={ <Loading/> }>
        <Nav { ...props }/>
    </Suspense>

};  // MobileNavigation


const App = ({ location: { pathname } }) => {

    const
        layout = useResponsiveLayout(768);

    let hasMenu;

    useEffect(() => {

        hasMenu = PathWithSideMenu.indexOf(pathname) > -1;

    }, [ pathname ]);

    return <>
        {/*<CookieBanner/>*/}
        <Header/>
        { layout === "mobile" && <Navigation layout={ layout }/> }
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
                                {/*<Route path="/deaths" component={ Deaths }/>*/}

                                <Route path="/about-data" component={ About }/>
                                {/*<Route path="/archive" component={ Archive }/>*/}
                                <Route path="/accessibility" component={ Accessibility }/>
                                <Route path="/cookies" component={ Cookies }/>
                                <Route path="/developers-guide" exact component={ ApiDocs }/>
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

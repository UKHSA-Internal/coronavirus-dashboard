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
import time from "d3-scale/src/time";

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

    const tmStart = moment(timestamp).local(true);
    const tmEnd = moment(timestamp).local(true).add(15, 'minute');

    const parsedTimestamp = {
        start: {
            year: tmStart.year(),
            month: tmStart.month(),
            day: tmStart.date(),
            hour: tmStart.hour(),
            minute: tmStart.minute()
        },
        end: {
            year: tmEnd.year(),
            month: tmEnd.month(),
            day: tmEnd.date(),
            hour: tmEnd.hour(),
            minute: tmEnd.minute()
        },
        endTimestamp: tmEnd
            .format("h:mma")
    };

    return <>

        <Suspense fallback={ <Loading/> }>
            { parsedTimestamp.start.day === 9
                ? <Announcement firstDisplayDate={ parsedTimestamp.start }
                                lastDisplayDate={{ year: 2020, month: 9, day: 11, hour: 16 }}>
                <p className={ "govuk-body" }>
                    We are awaiting data for cases in England. We will update the data as soon as possible.
                </p>
            </Announcement> : null}
            <Announcement firstDisplayDate={{ year: 2020, month: 9, day: 10, hour: 16 }}
                                  lastDisplayDate={{ year: 2020, month: 9, day: 11, hour: 7 }}>
                <p className={ "govuk-body" }>
                    Due to essential updates, the website and the API may be unstable or
                    unresponsive between 10pm Saturday (10&nbsp;Oct) and 6am Sunday (11&nbsp;Oct).
                </p>
            </Announcement>

            <Announcement firstDisplayDate={{ year: 2020, month: 9, day: 10, hour: 16 }}
                                  lastDisplayDate={{ year: 2021, month: 9, day: 11, hour: 7 }}>
                <p className={ "govuk-body" }>
                    We are launching a new version of the dashboard. We welcome your
                    feedback on the <a href={ "https://coronavirus-staging.data.gov.uk/" }
                                       className={ "govuk-link govuk-link--no-visited-state" }
                                       target={ "_blank" }
                                       rel={ "noopener noreferrer" }>
                        experimental release
                    </a> of the new service.
                </p>
            </Announcement>


            {/*{ parsedTimestamp.start.day === 3*/}
            {/*    ? <Announcement firstDisplayDate={ parsedTimestamp.start }*/}
            {/*              lastDisplayDate={{ year: 2020, month: 10, day: 5, hour: 15, minute: 55 }}>*/}
            {/*    <p className={ "govuk-body" }>*/}
            {/*        Due to a technical issue, which has now been resolved, there has been*/}
            {/*        a delay in publishing a number of COVID-19 cases to the dashboard in*/}
            {/*        England. This means the total reported over the coming days will include*/}
            {/*        some additional cases from the period between 24 September and 1 October,*/}
            {/*        increasing the number of cases reported.*/}
            {/*    </p>*/}
            {/*</Announcement> : null}*/}

            {
                timestamp
                    ? <Announcement firstDisplayDate={ parsedTimestamp.start }
                                  lastDisplayDate={ parsedTimestamp.end }>
                        <p className={ "govuk-body" }>
                            <strong>We are updating the data&hellip;</strong>
                        </p>
                        <p className={ "govuk-body" }>The process takes
                            approximately 15 minutes to complete. Please do not refresh the
                            website until { parsedTimestamp.endTimestamp }.
                        </p>
                    </Announcement>
                    : null
            }
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
                                <Route path="/deaths" component={ Deaths }/>

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

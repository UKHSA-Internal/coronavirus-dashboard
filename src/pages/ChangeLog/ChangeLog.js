// @flow

import React  from 'react';

import Loading from "components/Loading";
import BrowserHistory from "components/BrowserHistory";
import ChangeLogComponent from "components/ChangeLogComponent";


const ChangeLogData = [
    { 
        "date": "2020-10-26",
        "linkText": "Cases by age group",
        "relativeUrl": "/details/cases",
        "body": "These have been added to the cases page. The current trend is a higher rate is starting to appear in the over 60s, leading to increased hospital admissions"
    },

    { 
        "date": "2020-10-22",
        "linkText": "Local R numbers",
        "relativeUrl": "/",
        "body": "When you search for a postcode, the local R number for the region will now be displayed."
    },

    { 
        "date": "2020-10-19",
        "linkText": "Local alert levels",
        "relativeUrl": "/",
        "body": "When you search for a postcode, the local alert level will now be displayed."
    },

    { 
        "date": "2020-11-01",
        "linkText": "View Data",
        "relativeUrl": "/",
        "body": "November 01 Metric Change"
    },

    { 
        "date": "2020-09-01",
        "linkText": "View Data",
        "relativeUrl": "/",
        "body": "September 01 Metric Change"
    },
    { 
        "date": "2020-12-25",
        "linkText": "December Change",
        "relativeUrl": "/",
        "body": "December Change"
    },

];

const ChangeLog = () => {
    
    const data = ChangeLogData //useGenericAPI({url: "changeLog", defaultResponse: []});

    if ( !data ) return <Loading/>;

    const element = <ChangeLogComponent data={data}/>

    return <BrowserHistory element={element}/>

}; // ChangeLog


export default ChangeLog;

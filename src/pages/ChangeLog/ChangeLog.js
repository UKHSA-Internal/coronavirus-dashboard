// @flow

import React  from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import BrowserHistory from "components/BrowserHistory";
import ChangeLogComponent from "components/ChangeLogComponent";

const ChangeLogData = {
    "type":{
                "newMetric":"NEW METRIC",
                "newFeature":"NEW FEATURE",
                "changedMetric":"CHANGE TO METRIC",
                "update":"UPDATE",
                "newContent":"NEW CONTENT"
            },
     "changeLog":[
         {"type":"NEW FEATURE","date":"2020-10-30","displayBanner":true,"linkText": "Download data", "relativeUrl":"/details/download","headline":"MSOA data have been added to the downloads page.","body":"Area types in the download page now include MSOAs. The data are now available for  download by region, local authority, a single MSOA, or the full dataset. Downloaded  conetnts will also include information on region and local authority as well as MSOA. \n"},
         {"type":"NEW CONTENT","date":"2020-10-26","displayBanner":true,"linkText":"Cases by age group","relativeUrl":"/details/cases","headline":null,"body":"These have been added to the cases page. The current trend is a higher rate is starting  to appear in the over 60s, leading to increased hospital admissions. \n"},
         {"type":"NEW CONTENT","date":"2020-10-22","displayBanner":true,"linkText":"Local R numbers","relativeUrl":"/","headline":null,"body":"When you search for a postcode, the local R number for the region will now be displayed.\n"},
         {"type":"NEW CONTENT","date":"2020-10-19","displayBanner":true,"linkText":"Local alert levels","relativeUrl":"/","headline":null,"body":"When you search for a postcode, the local alert level will now be displayed.\n"}]};
const ChangeLog = () => {
    
    // const data = ChangeLogData //useGenericAPI({url: "changeLog", defaultResponse: []});

    const data = useGenericAPI("changeLogData", [], "json");

    if ( !data ) return <Loading/>;

    const element = <ChangeLogComponent data={data}/>

    return <BrowserHistory element={element}/>

}; // ChangeLog


export default ChangeLog;

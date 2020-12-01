// @flow

import { useState, useEffect } from "react";

import URLs from "common/urls";

import axios from "axios";



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

]

const useGenericAPI  = ( urlName: string, defaultResponse= null, responseType="json" ) => {


    const [ data, setData ] = useState(defaultResponse);

    useEffect( () => {
    
        (async () => {
            try {
                const { data: dt, status } = await axios.get(URLs[urlName], {responseType: responseType});

                status < 400
                    ? setData(dt)
                    : setData(defaultResponse);
            } catch (e) {
                console.error(e)
            }
        })();
    
    }, [urlName]);

    return data;

    // return ChangeLogData;

};  //useGenericAPI


export default useGenericAPI;
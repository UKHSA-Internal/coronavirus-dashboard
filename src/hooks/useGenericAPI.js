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


const  useGenericAPI  = ({defaultResponse=[]}) => {

    const [ data, setData ] = useState(defaultResponse);
   

    const getChangeLogData = () => {
    
        const getData = async () => {
        
            try {

                //const { data, status } = await axios.get(URLs.change-log);            
                const data = ChangeLogData;
                const status = 200;
                
                if ( status < 400 ) {
                    setData(data);
                } else {
                    setData([])
                }

            } catch (e) {
                console.error(e)
                setData([])
            }
        }

        getData();
    
    };

    useEffect(() => {
        getChangeLogData();
    }, []);

    const retObject =  {data};
    
    return retObject;

};  //useGenericAPI


export default useGenericAPI;
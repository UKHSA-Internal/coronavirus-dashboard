// @flow

import { useState, useMemo } from "react";

import URLs from "common/urls";

import axios from "axios";


const useMetricSearch  = ({ defaultResponse= null, kwargs= {},  params= {} }) => {

    const [ response, setResponse ] = useState(defaultResponse);
    const url = URLs["genericApiMetricSearch"];

    useMemo( () => {

        if ( !params?.search ) {
            return
        }

        for ( const param in params ) {
            if ( params.hasOwnProperty(param) && params[param] === undefined ) {
                delete params[param]
            }
        }


        (async () => {

            try {
                const { data, status } = await axios.get(url, {responseType: "json", params});

                if ( status < 400 )
                    setResponse(data);
                else if ( response !== defaultResponse ) {
                    setResponse(defaultResponse);
                    console.warn(`Failed request for "genericApiMetricSearch" with status ${status}`);
                }

            } catch (e) {
                console.log(`error ${url} ${JSON.stringify(params)}`)
                console.error(e)
            }
        })();

    }, [ JSON.stringify(kwargs), JSON.stringify(params) ]);

    return response;

};  //useGenericAPI


export default useMetricSearch;
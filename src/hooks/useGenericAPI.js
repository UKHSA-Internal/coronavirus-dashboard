// @flow

import { useState, useEffect } from "react";

import URLs from "common/urls";

import axios from "axios";

import type { ResponseType } from "axios";
import { strFormat } from "../common/utils";


const useGenericAPI  = ( urlName: string, defaultResponse: any= null, kwargs: any = {},
                         responseType: ResponseType="json", params={}, onError=undefined, onEmpty=undefined) => {

    const [ response, setResponse ] = useState(defaultResponse);
    const isGenericEndpoint = urlName.startsWith("genericApi");

    if ( onError === undefined ) {
        onError = defaultResponse;
    }

    if ( onEmpty === undefined ) {
        onEmpty = defaultResponse;
    }

    useEffect( () => {

        setResponse(null);
        let url = URLs[urlName];

        if ( isGenericEndpoint ) {
            url = strFormat(url, { kwargs })
        }
    
        (async () => {
        
            try {
                const { data, status } = await axios.get(url, {responseType, params});

                if ( status < 400 && status !== 204 )
                    setResponse(data);
                else if ( response !== defaultResponse ) {
                    setResponse(onEmpty);
                    console.warn(`Failed request for "${urlName}" with status ${status}`);
                }

            } catch (e) {
                setResponse(onError)
                console.log("error")
                console.error(e)
            }
        })();
    
    }, [ urlName, JSON.stringify(kwargs), JSON.stringify(params) ]);

    return response;

};  //useGenericAPI


export default useGenericAPI;
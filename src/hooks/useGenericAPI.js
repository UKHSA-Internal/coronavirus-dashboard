// @flow

import { useState, useEffect } from "react";

import URLs from "common/urls";

import axios from "axios";

import type { ResponseType } from "axios";
import { strFormat } from "common/utils";

import type {
    JsonPayload,
    URLNameOptions,
} from "./GenericApi.types";


const useGenericAPI = (
    urlName: URLNameOptions, defaultResponse: any= null, kwargs: JsonPayload = {},
    responseType: ResponseType="json", params={}, onError=undefined, onEmpty=undefined
): JsonPayload | JsonPayload[] | null | string => {

    const [ response, setResponse ] = useState(defaultResponse);
    const isGenericEndpoint = urlName.startsWith("genericApi");

    useEffect( () => {

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
                    if ( onEmpty !== "undefined" ) {
                        setResponse(onEmpty);
                    }
                    console.warn(`Failed request for "${urlName}" with status ${status}`);
                }

            } catch (e) {
                if ( onEmpty === "undefined" ) {
                    setResponse(onError)
                }
                console.log("error")
                console.error(e)
            }
        })();
    
    }, [ urlName, JSON.stringify(kwargs), JSON.stringify(params) ]);

    return response;

};  //useGenericAPI


export default useGenericAPI;
// @flow

import { useState, useEffect } from "react";

import URLs from "common/urls";

import axios from "axios";

import type { ResponseType } from "axios";


const useGenericAPI  = ( urlName: string, defaultResponse: any= null, responseType: ResponseType="json" ) => {


    const [ response, setResponse ] = useState(defaultResponse);

    useEffect( () => {
    
        (async () => {
            try {
                const { data, status } = await axios.get(URLs[urlName], {responseType: responseType});

                if ( status < 400 )
                    setResponse(data);
                else if ( response !== defaultResponse ) {
                    setResponse(defaultResponse);
                    console.warn(`Failed request for "${urlName}" with status ${status}`);
                }

            } catch (e) {
                console.error(e)
            }
        })();
    
    }, [ urlName ]);

    return response;

};  //useGenericAPI


export default useGenericAPI;


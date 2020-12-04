// @flow

import { useState, useEffect } from "react";

import URLs from "common/urls";

import axios from "axios";

const useGenericAPI  = ( urlName: string, defaultResponse= null, responseType="json" ) => {


    const [ data, setData ] = useState(defaultResponse);

    let st = null

    useEffect( () => {
    
        (async () => {
        
            try {
                const { data: dt, status } = await axios.get(URLs[urlName], {responseType: responseType});

                status < 400
                    ? setData(dt)
                    : setData(defaultResponse);
            } catch (e) {
                console.log("error")
                console.error(e)
            }
        })();
    
    }, [urlName]);

   
    return data;

};  //useGenericAPI


export default useGenericAPI;
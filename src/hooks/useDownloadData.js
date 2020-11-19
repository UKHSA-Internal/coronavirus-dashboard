// @flow

import { useState, useEffect } from "react";

import URLs from "common/urls";

import axios from "axios";


const useDownloadData  = ( urlName: string, defaultResponse= null ) => {

    const [ data, setData ] = useState(defaultResponse);

    useEffect( () => {
    
        (async () => {
            try {
                const { data: dt, status } = await axios.get(URLs[urlName]);
                status < 400
                    ? setData(dt)
                    : setData(defaultResponse);
            } catch (e) {
                console.error(e)
                setData(defaultResponse)
            }
        })();
    
    }, [urlName]);

    return data;

};  //useDownloadData


export default useDownloadData;

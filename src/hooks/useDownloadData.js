// @flow

import { useState, useEffect } from "react";

import URLs from "common/urls";

import axios from "axios";


const useDownloadData  = ({defaultResponse=[]}) => {

    const [loading, setLoading] = useState(true);
    const [ data, setData ] = useState(defaultResponse);
   

    const getDropDownData = () => {
    
        const getData = async () => {
        
            try {

                const { data, status } = await axios.get(URLs.metrics);            
                
                
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
        setLoading(false);
        getDropDownData();
    }, []);

    const retObject =  {loading, data};
    
    return retObject;

};  //useDownloadData


export default useDownloadData;

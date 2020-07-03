// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import URLs from "common/urls";


const useHierarchy = () => {

    const [ hierarchy, setHierarchy ] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                "area_hierarchy_v2.json",
                { baseURL: URLs.lookups }
            );
            setHierarchy(data)
        })()
    });

    return hierarchy;

};

export default useHierarchy;

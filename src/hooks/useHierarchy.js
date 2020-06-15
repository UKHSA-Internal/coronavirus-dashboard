// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import URLs from "common/urls";


const useHierarchy = () => {

    const [ hierarchy, setHierarchy ] = useState(null);

    useEffect(() => {

        const getData = async () => {

            const { data } = await axios.get(
                "area_hierarchy_v2.json",
                { baseURL: URLs.lookups }
            );

            setHierarchy(data)

        };

        getData();

    }, []);

    return hierarchy;

};

export default useHierarchy;

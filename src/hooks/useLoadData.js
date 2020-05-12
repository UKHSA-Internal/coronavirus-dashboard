// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';

import URLs from "common/urls";


const useLoadData = () => {
    const [data, setData] = useState<?Data>(null);

    useEffect(() => {
        const getData = async () => {
            const {data: d} = await axios.get(URLs.landingData);
            setData(d);
        };

        getData();
    }, []);

    return data;
};

export default useLoadData;

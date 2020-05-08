// @flow

import {useState, useEffect} from 'react';
import axios from 'axios';

const latestDataUrl = 'https://c19downloads.azureedge.net/downloads/data/landing.json';

const useLoadData = () => {
    const [data, setData] = useState<?Data>(null);

    useEffect(() => {
        const getData = async () => {
            const {data: d} = await axios.get(latestDataUrl);
            setData(d);
        };

        getData();
    }, []);

    return data;
};

export default useLoadData;

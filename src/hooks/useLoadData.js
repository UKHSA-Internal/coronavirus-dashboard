// @flow

import {useState, useEffect} from 'react';
import axios from 'axios';

const latestDataUrl = 'https://c19downloads.azureedge.net/downloads/data/data_latest.json';

const useLoadData = () => {
    const [data, setData] = useState<?Data>(null);

    useEffect(() => {
        const getData = async () => {
            const {data: d} = await axios.get(latestDataUrl);
            setData(d);
        };

        getData();
    }, []);

  // TEMPORARY: Remove once testing data is added to the official endpoint.
  // data.disclaimer should also be updated in the endpoint with details
  // of the data source.
  if (data) {
    data["overview"]["K02000001"]["dailyTests"] = [
      { "date": "2020-04-25", "value": 29058 },
      { "date": "2020-04-24", "value": 28760 },
      { "date": "2020-04-23", "value": 28532 },
      { "date": "2020-04-22", "value": 23560 },
      { "date": "2020-04-21", "value": 22814 },
      { "date": "2020-04-20", "value": 18206 },
      { "date": "2020-04-19", "value": 19316 },
      { "date": "2020-04-18", "value": 21626 },
      { "date": "2020-04-17", "value": 21389 },
      { "date": "2020-04-16", "value": 21328 },
      { "date": "2020-04-15", "value": 18665 },
      { "date": "2020-04-14", "value": 15994 },
      { "date": "2020-04-13", "value": 14982 },
      { "date": "2020-04-12", "value": 14506 },
      { "date": "2020-04-11", "value": 18000 },
      { "date": "2020-04-10", "value": 18091 },
      { "date": "2020-04-09", "value": 19116 },
      { "date": "2020-04-08", "value": 16095 },
      { "date": "2020-04-07", "value": 14682 },
      { "date": "2020-04-06", "value": 14006 },
      { "date": "2020-04-05", "value": 13069 }
    ];
  }

  return data;
};

export default useLoadData;

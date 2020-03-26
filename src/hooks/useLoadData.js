// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';

const formatDate = (d: Date) => `_${d.getFullYear()}${d.getMonth() + 1 < 10 ? '0' : ''}${d.getMonth() + 1}${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;

const overviewBlobUrl = (d: Date) => `https://c19pub.azureedge.net/overview${formatDate(d)}.json`;
const countryBlobUrl = (d: Date) => `https://c19pub.azureedge.net/countries${formatDate(d)}.json`;
const nhsRegionBlobUrl = (d: Date) => `https://c19pub.azureedge.net/regions${formatDate(d)}.json`;
const localAuthorityBlobUrl = (d: Date) => `https://c19pub.azureedge.net/local_authorities${formatDate(d)}.json`;

const useLoadData = () => {
  const [overviewData, setOverviewData] = useState<?OverviewData>(null);
  const [countryData, setCountryData] = useState<?CountryData>(null);
  const [nhsRegionData, setNhsRegionData] = useState<?NhsRegionData>(null);
  const [localAuthorityData, setLocalAuthorityData] = useState<?LocalAuthorityData>(null);

  useEffect(() => {
    // Fetch today's file, on 404 fallback by 1 day until a file is found
    const makeCall = async (urlFunc, setFunc) => {
      let status = 404;
      let data = null;
      let date = new Date();
      const minDate = new Date('2020-03-20');
      do {
        try {
          ({ data, status } = await axios.get(urlFunc(date), {
            validateStatus: status => {
              return (status >= 200 && status < 300) || status === 404;
            },
          }));
          date.setDate(date.getDate() - 1);
        } catch (error) {
          // TODO handle error
        }
      } while (status === 404 && date > minDate);
      if (status === 200) {
        setFunc(data);
      } else {
        // TODO handle error
      }     
    };
    makeCall(overviewBlobUrl, setOverviewData);
    makeCall(countryBlobUrl, setCountryData);
    makeCall(nhsRegionBlobUrl, setNhsRegionData);
    makeCall(localAuthorityBlobUrl, setLocalAuthorityData);
  }, []);

  return [overviewData, countryData, nhsRegionData, localAuthorityData];
};

export default useLoadData;

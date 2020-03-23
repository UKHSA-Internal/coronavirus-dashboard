// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';

const overviewBlobUrl = 'https://c19pub.azureedge.net/overview.json';
const countryBlobUrl = 'https://c19pub.azureedge.net/countries.json';
const nhsRegionBlobUrl = '';
const localAuthorityBlobUrl = 'https://c19pub.azureedge.net/local_authorities.json';

const useLoadData = () => {
  const [overviewData, setOverviewData] = useState<?OverviewData>(null);
  const [countryData, setCountryData] = useState<?CountryData>(null);
  const [nhsRegionData, setNhsRegionData] = useState<?NhsRegionData>(null);
  const [localAuthorityData, setLocalAuthorityData] = useState<?LocalAuthorityData>(null);

  useEffect(() => {
    const getOverviewData = async () => {
      const { data: d } = await axios.get(overviewBlobUrl);
      setOverviewData(d);
    };
    const getCountryData = async () => {
      const { data: d } = await axios.get(countryBlobUrl);
      setCountryData(d);
    };
    const getNhsRegionData = async () => {
      const { data: d } = await axios.get(nhsRegionBlobUrl);
      setNhsRegionData(d);
    };
    const getLocalAuthorityData = async () => {
      const { data: d } = await axios.get(localAuthorityBlobUrl);
      setLocalAuthorityData(d);
    };
    getOverviewData();
    getCountryData();
    getNhsRegionData();
    getLocalAuthorityData();
  }, []);

  return [overviewData, countryData, {}, localAuthorityData];
};

export default useLoadData;

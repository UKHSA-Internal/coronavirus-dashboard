// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';

const formatDate = (d: Date) => `_${d.getFullYear()}${d.getMonth() + 1 < 10 ? '0' : ''}${d.getMonth() + 1}${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;

const dataBlobUrl = (d: Date) => `https://c19pub.azureedge.net/data${formatDate(d)}.json`;

const useLoadData = () => {
  const [data, setData] = useState<?Data>(null);

  useEffect(() => {
    // Fetch today's file, on 404 fallback by 1 day until a file is found
    const makeCall = async (urlFunc, setFunc, massageData) => {
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
      if (status === 200 && data) {
        // $FlowFixMe
        setFunc(massageData(data));
      } else {
        // TODO handle error
      }     
    };

    makeCall(dataBlobUrl, setData, (d: Data) => {
      return {	
        ...d,	
        utlas: Object.keys(d?.utlas ?? {}).reduce<UtlaData>((acc, cur) => {	
          // Isles of Scilly	
          if (cur === 'E06000053') {	
            return acc;	
          }

          // Cornwall	
          if (cur === 'E06000052') {	
            return {	
              // $FlowFixMe	
              ...acc,	
              // $FlowFixMe	
              [cur]: {	
                ...d?.utlas[cur],	
                name: { value: 'Cornwall and Isles of Scilly' },	
                totalCases: { value: d?.utlas[cur].totalCases.value + (d?.utlas?.['E06000053']?.totalCases?.value ?? 0) },	
                // TODO dailyConfirmedCases	
                // TODO dailyTotalConfirmedCases	
              },	
            };	
          }	

          return {	
            ...acc,	
            [cur]: d?.utlas[cur],	
          };
        }, {}),	
      };
    });
  }, [data]);

  return data;
};

export default useLoadData;

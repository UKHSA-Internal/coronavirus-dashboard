// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import xmlToJSON from 'xmltojson';

const dataBlobUrl = (blob: string) => `https://c19pub.azureedge.net/${blob}`;
const listBucketUrl = 'https://publicdashacc.blob.core.windows.net/publicdata?restype=container&comp=list';

const getLatestBlobName = async () => {
  const { data } = await axios.get(listBucketUrl);
  const jsonData = xmlToJSON.parseString(data);
  const blobList = jsonData.EnumerationResults[0].Blobs[0].Blob;

  const getBlobDate = b => new Date(b.Properties[0]['Last-Modified'][0]._text);
  const mostRecentBlob = blobList.reduce((acc, cur) => {
    if (!cur.Name[0]._text.startsWith('data_')) {
      return acc;
    }

    if (!acc) {
      return cur;
    }

    return (getBlobDate(acc) > getBlobDate(cur)) ? acc : cur;
  }, null);

  return mostRecentBlob.Name[0]._text;
};

const useLoadData = () => {
  const [data, setData] = useState<?Data>(null);

  useEffect(() => {
    const getData = async () => {
      const latestBlobName = await getLatestBlobName();
      const { data: d } = await axios.get(dataBlobUrl(latestBlobName));
      const massagedData = {
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
      setData(massagedData);
    };

    getData();
  }, []);

  return data;
};

export default useLoadData;

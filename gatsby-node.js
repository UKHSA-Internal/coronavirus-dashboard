const axios = require('axios');
const xml2js = require('xml2js');

const dataBlobUrl = (blob) => `https://c19pub.azureedge.net/${blob}`;
const listBucketUrl = 'https://publicdashacc.blob.core.windows.net/publicdata?restype=container&comp=list';

const getLatestBlobName = async () => {
  const parser = new xml2js.Parser();
  const { data } = await axios.get(listBucketUrl);
  const jsonData = await parser.parseStringPromise(data);
  const blobList = jsonData.EnumerationResults.Blobs[0].Blob;

  const getBlobDate = b => new Date(b.Properties[0]['Last-Modified'][0]);
  const mostRecentBlob = blobList.reduce((acc, cur) => {
    if (!cur.Name[0].startsWith('data_')) {
      return acc;
    }

    if (!acc) {
      return cur;
    }

    return (getBlobDate(acc) > getBlobDate(cur)) ? acc : cur;
  }, null);

  return mostRecentBlob.Name[0];
};

const getData = async () => {
  const latestBlobName = await getLatestBlobName();
  const { data } = await axios.get(dataBlobUrl(latestBlobName));
  return data;
};

exports.createPages = async ({ actions: { createPage } }) => {
  const data = await getData();

  createPage({
    path: `/`,
    component: require.resolve("./src/layouts/Regional/Regional.js"),
    context: { data },
  });

  createPage({
    path: `/about`,
    component: require.resolve("./src/layouts/About/About.js"),
  });

  createPage({
    path: `/accessibility`,
    component: require.resolve("./src/layouts/Accessibility/Accessibility.js"),
  });

  createPage({
    path: `/region`,
    component: require.resolve("./src/layouts/MobileRegionTable/MobileRegionTable.js"),
    context: { data },
  });
}

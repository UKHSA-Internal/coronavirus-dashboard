// @flow

import axios from 'axios';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import L from 'leaflet';

export const nhsRegionCoordinates = {
  // London
  E40000003: [-0.1278, 51.5074],
  // Midlands
  E40000008: [-1.4, 52.7],
  // South east
  E40000005: [-0.5596, 51.1781],
  // North west
  E40000010: [-2.5945, 53.6221],
  // North east and yorkshire
  E40000009: [-1.2, 54],
  // East
  E40000007: [0.1927, 52.1911],
  // South west
  E40000006: [-3.9995, 50.7772],
};

const addNhsRegionLayer = async (nhsRegionData: NhsRegionData) => {
  const { data: nhsRegionGeojson } = await axios.get('https://opendata.arcgis.com/datasets/42ab857359ae4acabfca44b97c0f99b3_0.geojson');

  const nhsRegionMax = max(Object.keys(nhsRegionData), d => nhsRegionData?.[d]?.totalCases?.value ?? 0);
  const radiusScale = scaleLinear().range([5, 40]).domain([1, nhsRegionMax]);

  const circleLayer = L.geoJSON(
    Object.keys(nhsRegionCoordinates).map(c => ({
      type: 'Feature',
      properties: {
        name: nhsRegionData?.[c]?.name?.value ?? 0,
        count: nhsRegionData?.[c]?.totalCases?.value ?? 0,
      },
      geometry: {
        type: 'Point',
        coordinates: nhsRegionCoordinates[c],
      },
    })),
    {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
        radius: feature.properties.count === 0 ? 0 : radiusScale(feature.properties.count),
        fillColor: "#1D70B8",
        fillOpacity: 0.6,
        weight: 0,
      }),
    },
  );

  const boundryLayer = L.geoJSON(nhsRegionGeojson.features, {
    style: {
      color: '#0b0c0c',
      weight: 1,
      opacity: 0.7,
      fillOpacity: 0,
    },
  });

  return [circleLayer, boundryLayer];
};

export default addNhsRegionLayer;
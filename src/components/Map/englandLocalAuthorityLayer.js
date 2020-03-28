// @flow

import axios from 'axios';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import L from 'leaflet';

const addEnglandLocalAuthorityLayer = async (localAuthorityData: LocalAuthorityData) => {
  const { data: englandGeojsonRaw } = await axios.get('https://opendata.arcgis.com/datasets/a917c123e49d436f90660ef6a9ceb5cc_0.geojson');

  const localAuthorityMax = max(Object.keys(localAuthorityData), d => localAuthorityData?.[d]?.totalCases?.value ?? 0);
  const radiusScale = scaleLinear().range([5, 25]).domain([1, localAuthorityMax]);

  const englandGeojson = englandGeojsonRaw.features.map(f => ({
      ...f,
      properties: {
        ...f.properties,
        count: localAuthorityData?.[f.properties.LAD13NM]?.totalCases?.value ?? 0, 
        name: f.properties.LAD13NM,
      },
  }));

  const circleLayer = L.geoJSON(
    englandGeojson.map(la => ({
      type: 'Feature',
      properties: {
        name: la.properties.ctyua19nm,
        count: localAuthorityData?.[la.properties.ctyua19cd]?.totalCases?.value ?? 0, 
      },
      geometry: {
        type: 'Point',
        coordinates: [la.properties.long, la.properties.lat],
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

  const boundryLayer = L.geoJSON(englandGeojson, {
    style: {
      color: '#0b0c0c',
      weight: 1,
      opacity: 0.7,
      fillOpacity: 0,
    },
  });

  return [circleLayer, boundryLayer];
};

export default addEnglandLocalAuthorityLayer;
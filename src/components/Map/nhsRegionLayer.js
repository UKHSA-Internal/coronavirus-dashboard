// @flow

import axios from 'axios';
import { max } from 'd3-array';

import zoomLayers from './zoomLayers';


const addNhsRegionLayer = async (map, nhsRegionData, onClick) => {
  const { data: nhsRegionGeojsonRaw } = await axios.get('https://opendata.arcgis.com/datasets/42ab857359ae4acabfca44b97c0f99b3_0.geojson');

  const nhsRegionMax = max(Object.keys(nhsRegionData), d => nhsRegionData?.[d]?.totalCases?.value ?? 0);

  const addCounts = (g, key) => ({
    ...g,
    features: g.features.map(f => ({
      ...f,
      properties: {
        ...f.properties,
        count: nhsRegionData?.[f.properties[key]]?.totalCases?.value ?? 0, 
        name: f.properties.name,
      },
    })),
  });

  const nhsRegionGeojson = addCounts(nhsRegionGeojsonRaw, 'name');
  map.addSource('nhs-regions', { 'type': 'geojson', 'data': nhsRegionGeojson });

  map.addSource('nhs-regions-latlong', {
    type: 'geojson',
    data: {
      type: "FeatureCollection",
      features: [
        ['London', [-0.1278, 51.5074]],
        ['Midlands', [-1.4, 52.7]],
        ['South East', [-0.5596, 51.1781]],
        ['North West', [-2.5945, 53.6221]],
        ['North East and Yorkshire', [-1.2, 54]],
        ['East of England', [0.1927, 52.1911]],
        ['South West', [-3.9995, 50.7772]],
      ].map(c => ({
        type: 'Feature',
        properties: {
          name: c[0],
          count: nhsRegionData?.[c[0]]?.totalCases?.value ?? 10,
        },
        geometry: {
          type: 'Point',
          coordinates: c[1],
        },
      })),
    },
  });

  map.addLayer({
    'id': 'nhs-regions-boundries',
    'type': 'line',
    'source': 'nhs-regions',
    'minzoom': zoomLayers.nhsRegion.min,
    'maxzoom': zoomLayers.nhsRegion.max,
    'layout': {},
    'paint': {
      'line-color': '#0b0c0c',
      'line-opacity': 0.5,
      'line-width': {
        "stops": [[3, 0.5], [5, 1], [13, 3]]
      },
    },
  });

  map.addLayer({
    'id': 'nhs-regions-circles',
    'type': 'circle',
    'source': 'nhs-regions-latlong',
    'minzoom': zoomLayers.nhsRegion.min,
    'maxzoom': zoomLayers.nhsRegion.max,
    'layout': {},
    'paint': {
      'circle-color': '#1D70B8',
      'circle-opacity': 0.6,
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'count'],
        0, 0,
        1, 5,
        20, 40,
      ],
    },
  });

  map.addLayer({
    'id': 'nhs-regions-fill',
    'type': 'fill',
    'source': 'nhs-regions',
    'minzoom': zoomLayers.nhsRegion.min,
    'maxzoom': zoomLayers.nhsRegion.max,
    'layout': {},
    'paint': {
      'fill-opacity': 0,
    },
  });
  map.on('click', 'nhs-regions-fill', e => {
    onClick(e.features[0].properties.name);
  });
};

export default addNhsRegionLayer;
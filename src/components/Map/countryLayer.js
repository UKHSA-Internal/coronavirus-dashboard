// @flow

import { max } from 'd3-array';

import zoomLayers from './zoomLayers';

export const countryCoordinates = {
  // England
  E92000001: [-1.1743, 52.3555],
  // Scotland
  S92000003: [-4.2026, 56.4907],
  // Wales
  W92000004: [-3.7837, 52.1307],
  // NI
  N92000002: [-6.4923, 54.7877],
};

const addCountryLayer = (map, countryData, onClick) => {
  const countryMax = max(Object.keys(countryData), d => countryData?.[d]?.totalCases?.value ?? 0);

  map.addSource('countries-latlong', {
    type: 'geojson',
    data: {
      type: "FeatureCollection",
      features: Object.keys(countryCoordinates).map(c => ({
        type: 'Feature',
        properties: {
          name: countryData?.[c]?.name?.value ?? 0,
          count: countryData?.[c]?.totalCases?.value ?? 0,
        },
        geometry: {
          type: 'Point',
          coordinates: countryCoordinates[c],
        },
      })),
    },
  });
  map.addLayer({
    'id': 'countries-circle',
    'type': 'circle',
    'source': 'countries-latlong',
    'minzoom': zoomLayers.country.min,
    'maxzoom': zoomLayers.country.max,
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
        countryMax, 40,
      ],
    },
  });

  map.on('click', 'countries-circle', e => {
    onClick(e.features[0].properties.name);
  });
};

export default addCountryLayer;
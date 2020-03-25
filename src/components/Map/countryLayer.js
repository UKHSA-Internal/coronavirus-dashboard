// @flow

import { max } from 'd3-array';

import zoomLayers from './zoomLayers';

const addCountryLayer = (map, countryData) => {
  const countryMax = max(Object.keys(countryData), d => countryData?.[d]?.totalCases?.value ?? 0);

  map.addSource('countries-latlong', {
    type: 'geojson',
    data: {
      type: "FeatureCollection",
      features: [
        ['England', [-1.1743, 52.3555]],
        ['Scotland', [-4.2026, 56.4907]],
        ['Wales', [-3.7837, 52.1307]],
        ['Northern Ireland', [-6.4923, 54.7877]],
      ].map(c => ({
        type: 'Feature',
        properties: {
          count: countryData?.[c[0]]?.totalCases?.value ?? 0,
        },
        geometry: {
          type: 'Point',
          coordinates: c[1],
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
};

export default addCountryLayer;
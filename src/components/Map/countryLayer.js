// @flow

import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import L from 'leaflet';

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

const addCountryLayer = (countryData: CountryData) => {
  const countryMax = max(Object.keys(countryData), d => countryData?.[d]?.totalCases?.value ?? 0);
  const radiusScale = scaleLinear().range([5, 40]).domain([1, countryMax]);

  const countryCircles = L.geoJSON(
    Object.keys(countryCoordinates).map(c => ({
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
    {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
        radius: feature.properties.count === 0 ? 0 : radiusScale(feature.properties.count),
        fillColor: "#1D70B8",
        fillOpacity: 0.6,
        weight: 0,
      }),
    },
  );

  return [countryCircles];
};

export default addCountryLayer;
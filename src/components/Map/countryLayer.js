/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import { useState, useEffect } from 'react';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import L, { layerGroup } from 'leaflet';

const countryCoordinates = {
  // England
  E92000001: [-1.1743, 52.3555],
  // Scotland
  S92000003: [-4.2026, 56.4907],
  // Wales
  W92000004: [-3.7837, 52.1307],
  // NI
  N92000002: [-6.4923, 54.7877],
};

const useCountryLayer = (countryData: CountryData, hash, layerGroup, country, nhsRegion, localAuthority) => {
  const countryMax = max(Object.keys(countryData), d => countryData?.[d]?.totalCases?.value ?? 0);
  const radiusScale = scaleLinear().range([5, 40]).domain([1, countryMax]);
  const [countryLayers, setCountryLayers] = useState(null);

  useEffect(() => {
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
    setCountryLayers([countryCircles]);

    if (layerGroup && hash === '#countries') {
      layerGroup.clearLayers();
      layerGroup.addLayer(countryCircles);
    }
  }, [hash, country, nhsRegion, localAuthority, layerGroup]);

  return countryLayers;
};

export default useCountryLayer;
/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import { max } from 'd3-array';
import { scaleSqrt } from 'd3-scale';
import L from 'leaflet';

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

const useCountryLayer = (countryData: CountryData, hash: string, layerGroup: L.LayerGroup, country: string, region: string, utla: string, onClick: Function) => {
  const [countryGeojsonRaw, setCountryGeojsonRaw] = useState(null);
  const [countryLayers, setCountryLayers] = useState(null);

  const countryMax = max(Object.keys(countryData), d => countryData?.[d]?.totalCases?.value ?? 0);
  const radiusScale = scaleSqrt().range([5, 40]).domain([1, countryMax]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://c19pub.azureedge.net/countries.geojson');
      setCountryGeojsonRaw(data);
    })();
  }, []);

  useEffect(() => {
    if (countryGeojsonRaw) {
      const countryGeojson = countryGeojsonRaw.features.map(f => ({
        ...f,
        properties: {
          ...f.properties,
          id: f.properties.ctry19cd,
        },
      }));

      const boundryLayer = L.geoJSON(countryGeojson, {
        style: feature => ({
          color: '#0b0c0c',
          weight: 1,
          opacity: 0.7,
          fillColor: "#1D70B8",
          fillOpacity: country === feature.properties.id ? 0.2 : 0,
        }),
        onEachFeature: (feature, layer) => {
          layer.on({
            click: () => {
              onClick(feature.properties.id);
            },
          });
        },
      });

      const circleLayer = L.geoJSON(
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
      setCountryLayers([circleLayer, boundryLayer]);

      if (layerGroup && (hash === '' || hash === '#countries')) {
        layerGroup.clearLayers();
        [circleLayer, boundryLayer].map(l => layerGroup.addLayer(l));
      }
    }
  }, [JSON.stringify(countryGeojsonRaw), hash, country, region, utla, layerGroup]);

  return countryLayers;
};

export default useCountryLayer;
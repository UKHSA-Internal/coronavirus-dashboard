/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import L, { layerGroup } from 'leaflet';

const nhsRegionCoordinates = {
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

const useNhsRegionLayer = (nhsRegionData: NhsRegionData, hash, layerGroup, country, nhsRegion, localAuthority, onClick: Function) => {
  const [nhsRegionGeojsonRaw, setNhsRegionGeojsonRaw] = useState(null);
  const [nhsRegionLayers, setNhsRegionLayers] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://opendata.arcgis.com/datasets/42ab857359ae4acabfca44b97c0f99b3_0.geojson');
      setNhsRegionGeojsonRaw(data);
    })();
  }, []);

  useEffect(() => {
    if (nhsRegionGeojsonRaw) {
      const nhsRegionMax = max(Object.keys(nhsRegionData), d => nhsRegionData?.[d]?.totalCases?.value ?? 0);
      const radiusScale = scaleLinear().range([5, 40]).domain([1, nhsRegionMax]);

      const nhsRegionGeojson = nhsRegionGeojsonRaw.features.map(f => ({
          ...f,
          properties: {
            ...f.properties,
            id: f.properties.nhser19cd,
          },
      }));

      const boundryLayer = L.geoJSON(nhsRegionGeojson, {
        style: feature => ({
          color: '#0b0c0c',
          weight: 1,
          opacity: 0.7,
          fillColor: "#1D70B8",
          fillOpacity: nhsRegion === feature.properties.id ? 0.2 : 0,
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

      setNhsRegionLayers([circleLayer, boundryLayer]);

      if (layerGroup && hash === '#nhs-regions') {
        layerGroup.clearLayers();
        [circleLayer, boundryLayer].map(l => layerGroup.addLayer(l));
      }
    }
  }, [JSON.stringify(nhsRegionGeojsonRaw), hash, country, nhsRegion, localAuthority]);

  return nhsRegionLayers;
};

export default useNhsRegionLayer;
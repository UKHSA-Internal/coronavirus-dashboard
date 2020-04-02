/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import { max } from 'd3-array';
import { scaleSqrt } from 'd3-scale';
import L from 'leaflet';

const nhsRegionCoordinates = {
  // West midlands
  E12000005: [-2.20358, 52.556969],
  // East of england
  E12000006: [0.504207, 52.24073],
  // North west
  E12000002: [-2.77239, 54.44944],
  // East midlands
  E12000004: [-0.84969, 52.795719],
  // South west
  E12000009: [-3.63346, 50.811192], 
  // London
  E12000007: [-0.30866, 51.492271], 
  // Yorkshire and the humber
  E12000003: [-1.28714, 53.93264],
  // North east
  E12000001: [-1.72888, 55.297009], 
  // South east
  E12000008: [-0.99311, 51.45097], 
};

const useNhsRegionLayer = (nhsRegionData: NhsRegionData, hash, layerGroup, country, nhsRegion, localAuthority, onClick: Function) => {
  const [nhsRegionGeojsonRaw, setNhsRegionGeojsonRaw] = useState(null);
  const [nhsRegionLayers, setNhsRegionLayers] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://c19pub.azureedge.net/regions.geojson');
      // const { data } = await axios.get('https://opendata.arcgis.com/datasets/1b784deec90c46358c7a074aef8d3211_0.geojson');
      setNhsRegionGeojsonRaw(data);
    })();
  }, []);

  useEffect(() => {
    if (nhsRegionGeojsonRaw) {
      const nhsRegionMax = max(Object.keys(nhsRegionData), d => nhsRegionData?.[d]?.totalCases?.value ?? 0);
      const radiusScale = scaleSqrt().range([5, 40]).domain([1, nhsRegionMax]);

      const nhsRegionGeojson = nhsRegionGeojsonRaw.features.map(f => ({
          ...f,
          properties: {
            ...f.properties,
            id: f.properties.rgn19cd,
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
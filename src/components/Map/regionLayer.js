/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import { max } from 'd3-array';
import { scaleSqrt } from 'd3-scale';
import L from 'leaflet';

const regionCoordinates = {
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

const useRegionLayer = (regionData: RegionData, hash: string, layerGroup: L.LayerGroup, country: string, region: string, utla: string, onClick: Function) => {
  const [regionGeojsonRaw, setRegionGeojsonRaw] = useState(null);
  const [regionLayers, setRegionLayers] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://opendata.arcgis.com/datasets/1b784deec90c46358c7a074aef8d3211_0.geojson');
      setRegionGeojsonRaw(data);
    })();
  }, []);

  useEffect(() => {
    if (regionGeojsonRaw) {
      const regionMax = max(Object.keys(regionData), d => regionData?.[d]?.totalCases?.value ?? 0);
      const radiusScale = scaleSqrt().range([5, 40]).domain([1, regionMax]);

      const regionGeojson = regionGeojsonRaw.features.map(f => ({
          ...f,
          properties: {
            ...f.properties,
            id: f.properties.rgn18cd,
          },
      }));

      const boundryLayer = L.geoJSON(regionGeojson, {
        style: feature => ({
          color: '#0b0c0c',
          weight: 1,
          opacity: 0.7,
          fillColor: "#1D70B8",
          fillOpacity: region === feature.properties.id ? 0.2 : 0,
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
        Object.keys(regionCoordinates).map(c => ({
          type: 'Feature',
          properties: {
            name: regionData?.[c]?.name?.value ?? 0,
            count: regionData?.[c]?.totalCases?.value ?? 0,
          },
          geometry: {
            type: 'Point',
            coordinates: regionCoordinates[c],
          },
        })),
        {
          pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
            radius: feature.properties.count === 0 ? 0 : radiusScale(feature.properties.count),
            fillColor: "#1D70B8",
            weight: 0,
            fillOpacity: feature.properties.count === 0 ? 0 : 0.6,
          }),
        },
      );

      setRegionLayers([circleLayer, boundryLayer]);

      if (layerGroup && hash === '#regions') {
        layerGroup.clearLayers();
        [circleLayer, boundryLayer].map(l => layerGroup.addLayer(l));
      }
    }
  }, [JSON.stringify(regionGeojsonRaw), hash, country, region, utla, layerGroup]);

  return regionLayers;
};

export default useRegionLayer;
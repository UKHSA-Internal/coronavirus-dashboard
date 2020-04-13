/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import { useState, useEffect } from 'react';
import axios from 'axios';
import { max } from 'd3-array';
import { scaleSqrt } from 'd3-scale';
import L from 'leaflet';

const useUtlaLayer = (utlaData: UtlaData, hash: string, layerGroup: L.LayerGroup, country: string, region: string, utla: string, onClick: Function) => {
  const [englandGeojsonRaw, setEnglandGeojsonRaw] = useState(null);
  const [utlaLayers, setUtlaLayers] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://c19pub.azureedge.net/utlas.geojson');
      setEnglandGeojsonRaw(data);
    })();
  }, []);

  useEffect(() => {
    if (englandGeojsonRaw) {
      const utlaMax = max(Object.keys(utlaData), d => utlaData?.[d]?.totalCases?.value ?? 0);
      const radiusScale = scaleSqrt().range([5, 25]).domain([1, utlaMax]);

      const englandGeojson = englandGeojsonRaw.features.map(f => ({
          ...f,
          properties: {
            ...f.properties,
            id: f.properties.ctyua19cd,
          },
      }));

      const boundryLayer = L.geoJSON(englandGeojson, {
        style: feature => ({
          color: '#0b0c0c',
          weight: 1,
          opacity: 0.7,
          fillColor: "#1D70B8",
          fillOpacity: utla === feature.properties.id ? 0.2 : 0,
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
        englandGeojson.map(la => ({
          type: 'Feature',
          properties: {
            count: utlaData?.[la.properties.ctyua19cd]?.totalCases?.value ?? 0, 
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
            fillOpacity: feature.properties.count === 0 ? 0 : 0.6,
            weight: 0,
          }),
        },
      );

      setUtlaLayers([circleLayer, boundryLayer]);

      if (layerGroup && hash === '#local-authorities') {
        layerGroup.clearLayers();
        [circleLayer, boundryLayer].map(l => layerGroup.addLayer(l));
      }
    }
  }, [JSON.stringify(englandGeojsonRaw), hash, country, region, utla]);

  return utlaLayers;
};

export default useUtlaLayer;
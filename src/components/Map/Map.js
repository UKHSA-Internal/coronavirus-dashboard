/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import L from 'leaflet';

import useCountryLayer from './countryLayer';
import useRegionLayer from './regionLayer';
import useUtlaLayer from './utlaLayer';
import zoomLayers from './zoomLayers';

import * as Styles from './Map.styles';

import 'leaflet/dist/leaflet.css';

const countryCoordinates = {
  // England
  E92000001: [52.3555, -1.1743],
  // Scotland
  S92000003: [56.4907, -4.2026],
  // Wales
  W92000004: [52.1307, -3.7837],
  // NI
  N92000002: [54.7877, -6.4923],
};

const regionCoordinates = {
  // West midlands
  E12000005: [52.556969, -2.20358],
  // East of england
  E12000006: [52.24073, 0.504207],
  // North west
  E12000002: [54.44944, -2.77239],
  // East midlands
  E12000004: [52.795719, -0.84969],
  // South west
  E12000009: [50.811192, -3.63346], 
  // London
  E12000007: [51.492271, -0.30866], 
  // Yorkshire and the humber
  E12000003: [53.93264, -1.28714],
  // North east
  E12000001: [55.297009, -1.72888], 
  // South east
  E12000008: [51.45097, -0.99311], 
};

const Map: ComponentType<Props> = ({
  country,
  setCountry,
  countryData,
  region,
  setRegion,
  regionData,
  utla,
  setUtla,
  utlaData,
  location: { hash },
}: Props) => {
  const [map, setMap] = useState(null);
  const [utlaCoordinates, setUtlaCoordinates] = useState({});
  const [layerGroup, setLayerGroup] = useState(null);

  // Initialise map
  useEffect(() => {
    const initializeMap = () => {
      const map = L.map('map', {
        center: [55, -4],
        zoom: 4.5, 
        layers: [
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20,
          })
        ]
      });

      map.zoomControl.setPosition('bottomright');

      setLayerGroup(L.layerGroup().addTo(map));

      setMap(map);
    };

    if (!map) {
      initializeMap();
    }
  }, []);

  // Setup layers, updating layers is handled within the hooks
  useCountryLayer(countryData, hash, layerGroup, country, region, utla, id => {
    setCountry(id);
    setRegion(null);
    setUtla(null);
  });
  useRegionLayer(regionData, hash, layerGroup, country, region, utla, id => {
    setCountry(null);
    setRegion(id);
    setUtla(null);
  });
  useUtlaLayer(utlaData, hash, layerGroup, country, region, utla, id => {
    setCountry(null);
    setRegion(null);
    setUtla(id);
  });

  // Load utla coordinates
  useEffect(() => {
     (async () => {
      const { data } = await axios.get('https://c19pub.azureedge.net/utlas.geojson');
      const c = data.features.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.properties.ctyua19cd]: {
            long: cur.properties.long,
            lat: cur.properties.lat,
          },
        };
      }, {});
      setUtlaCoordinates(c);
    })();
  }, []);

  // Fly to area when selected area changes
  useEffect(() => {
    if (map) {
      if (country) {
        map.flyTo(countryCoordinates[country], zoomLayers.country.max - 1, { animate: false });
      }
      if (region) {
        map.flyTo(regionCoordinates[region], zoomLayers.region.min, { animate: false });
      }
      if (utla) {
        const la = utlaCoordinates[utla];
        if (la) {
          map.flyTo([la.lat, la.long], zoomLayers.utla.min + 2, { animate: false });
        }
      }
    }
  }, [country, region, utla]);

  return <Styles.Map id="map" />;
};

export default withRouter(Map);
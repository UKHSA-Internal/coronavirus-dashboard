/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import L, { layerGroup } from 'leaflet';

import useCountryLayer from './countryLayer';
import useNhsRegionLayer from './nhsRegionLayer';
import useEnglandLocalAuthorityLayer from './englandLocalAuthorityLayer';
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

const nhsRegionCoordinates = {
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
  nhsRegion,
  setNhsRegion,
  nhsRegionData,
  localAuthority,
  setLocalAuthority,
  localAuthorityData,
  history: { push },
  location: { pathname, hash },
}: Props) => {
  const [map, setMap] = useState(null);
  const [utlaCoordinates, setUtlaCoordinates] = useState({});
  const [layerGroup, setLayerGroup] = useState(null);
  // const layerGroup = useRef(null);

  // Initialise map
  useEffect(() => {
    const initializeMap = () => {
      const map = L.map('map', {
        center: [55, -4],
        maxBounds: [
          [45, -6],
          [65, 2],
        ],
        zoom: 4.5, 
        layers: [
          // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
          //   maxZoom: 20,
          //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          // }),
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20,
          })
        ]
      });

      map.zoomControl.setPosition('bottomright');

      // layerGroup.current = L.layerGroup().addTo(map);
      setLayerGroup(L.layerGroup().addTo(map));

      setMap(map);
    };

    if (!map) {
      initializeMap();
    }
  }, []);

  // Setup layers, updating layers is handled within the hooks
  useCountryLayer(countryData, hash, layerGroup, country, nhsRegion, localAuthority);
  useNhsRegionLayer(nhsRegionData, hash, layerGroup, country, nhsRegion, localAuthority, id => {
    setCountry(null);
    setNhsRegion(id);
    setLocalAuthority(null);
  });
  useEnglandLocalAuthorityLayer(localAuthorityData, hash, layerGroup, country, nhsRegion, localAuthority, id => {
    setCountry(null);
    setNhsRegion(null);
    setLocalAuthority(id);
  });

  // Load utla coordinates
  useEffect(() => {
     (async () => {
      const { data } = await axios.get('https://opendata.arcgis.com/datasets/a917c123e49d436f90660ef6a9ceb5cc_0.geojson');
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

  // Setup zoom handler to add/remove layers
  useEffect(() => {
    (async () => {
      if (map) {
        const handleZoomend = () => {
          const zoom = map.getZoom();
          if (zoom >= zoomLayers.country.min && zoom < zoomLayers.country.max && hash !== '#countries') {
            push(`${pathname}#countries`);
          }
          if (zoom >= zoomLayers.nhsRegion.min && zoom < zoomLayers.nhsRegion.max && hash !== '#nhs-regions') {
            push(`${pathname}#nhs-regions`);
          }
          if (zoom >= zoomLayers.localAuthority.min && zoom < zoomLayers.localAuthority.max && hash !== '#local-authorities') {
            push(`${pathname}#local-authorities`);
          }
        };
        map.on('zoomend', handleZoomend);
        handleZoomend();
      }
    })();
  }, [map, hash, pathname]);

  // Set zoom when url hash changes
  useEffect(() => {
    if (map) {
      const zoom = map.getZoom();
      if ((zoom < zoomLayers.country.min || zoom >= zoomLayers.country.max) && hash === '#countries') {
        map.setZoom(zoomLayers.country.max - 1);
      }
      if ((zoom < zoomLayers.nhsRegion.min || zoom >= zoomLayers.nhsRegion.max) && hash === '#nhs-regions') {
        map.setZoom(zoomLayers.nhsRegion.min);
      }
      if ((zoom < zoomLayers.localAuthority.min || zoom >= zoomLayers.localAuthority.max) && hash === '#local-authorities') {
        map.setZoom(zoomLayers.localAuthority.min);
      }
    }
  }, [hash, map]);

  // Fly to area when selected area changes
  useEffect(() => {
    if (map) {
      if (country) {
        map.flyTo(countryCoordinates[country], zoomLayers.country.max - 1, { animate: false });
      }
      if (nhsRegion) {
        map.flyTo(nhsRegionCoordinates[nhsRegion], zoomLayers.nhsRegion.min, { animate: false });
      }
      if (localAuthority) {
        const la = utlaCoordinates[localAuthority];
        if (la) {
          map.flyTo([la.lat, la.long], zoomLayers.localAuthority.min + 2, { animate: false });
        }
      }
    }
  }, [country, nhsRegion, localAuthority]);

  return <Styles.Map id="map" />;
};

export default withRouter(Map);
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
  // London
  E40000003: [51.5074, -0.1278],
  // Midlands
  E40000008: [52.7, -1.4],
  // South east
  E40000005: [51.1781, -0.5596],
  // North west
  E40000010: [53.6221, -2.5945],
  // North east and yorkshire
  E40000009: [54, -1.2],
  // East
  E40000007: [52.1911, 0.1927],
  // South west
  E40000006: [50.7772, -3.9995],
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
        zoom: 4.5, 
        layers: [
          L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          }),
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
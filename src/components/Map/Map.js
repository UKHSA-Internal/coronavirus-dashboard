/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import L from 'leaflet';

import addCountryLayer, { countryCoordinates } from './countryLayer';
import addNhsRegionLayer, { nhsRegionCoordinates } from './nhsRegionLayer';
import addEnglandLocalAuthorityLayer from './englandLocalAuthorityLayer';
import zoomLayers from './zoomLayers';

import * as Styles from './Map.styles';

import 'leaflet/dist/leaflet.css';

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
  const [layerGroup, setLayerGroup] = useState(null);
  const [countryLayers, setCountryLayers] = useState(null);
  const [nhsRegionLayers, setNhsRegionLayers] = useState(null);
  const [utlaLayers, setUtlaLayers] = useState(null);
  const [utlaCoordinates, setUtlaCoordinates] = useState({});

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

  useEffect(() => {
    const initializeMap = async () => {
      const layers = await Promise.all([
        addCountryLayer(countryData),
        addNhsRegionLayer(nhsRegionData),
        addEnglandLocalAuthorityLayer(localAuthorityData),
      ]);
      setCountryLayers(layers[0]);
      setNhsRegionLayers(layers[1]);
      setUtlaLayers(layers[2]);

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

      const layerGroup = L.layerGroup().addTo(map);
      setLayerGroup(layerGroup);

      setMap(map);
    };

    if (!map) {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (map) {
        const handleZoomend = () => {
          const zoom = map.getZoom();
          if (zoom >= zoomLayers.country.min && zoom < zoomLayers.country.max && hash !== '#countries') {
            layerGroup.clearLayers();
            countryLayers.map(l => layerGroup.addLayer(l));
            push(`${pathname}#countries`);
          }
          if (zoom >= zoomLayers.nhsRegion.min && zoom < zoomLayers.nhsRegion.max && hash !== '#nhs-regions') {
            layerGroup.clearLayers();
            nhsRegionLayers.map(l => layerGroup.addLayer(l));
            push(`${pathname}#nhs-regions`);
          }
          if (zoom >= zoomLayers.localAuthority.min && zoom < zoomLayers.localAuthority.max && hash !== '#local-authorities') {
            layerGroup.clearLayers();
            utlaLayers.map(l => layerGroup.addLayer(l));
            push(`${pathname}#local-authorities`);
          }
        };
        map.on('zoomend', handleZoomend);
        handleZoomend();
      }
    })();
  }, [map, hash, pathname]);

  useEffect(() => {
    if (map){
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

  useEffect(() => {
    if (map) {
      if (country) {
        map.flyTo(countryCoordinates[country].reverse(), zoomLayers.country.max - 1, { animate: false });
      }
      if (nhsRegion) {
        map.flyTo(nhsRegionCoordinates[nhsRegion].reverse(), zoomLayers.nhsRegion.min, { animate: false });
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
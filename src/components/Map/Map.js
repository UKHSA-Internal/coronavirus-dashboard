/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import mapboxgl from 'mapbox-gl';

import { MAPBOX_API_KEY } from 'config';
import zoomLayers from './zoomLayers';
import addCountryLayer from './countryLayer';
import addNhsRegionLayer from './nhsRegionLayer';
import addEnglandLocalAuthorityLayer from './englandLocalAuthorityLayer';

import type { Props } from './Map.types';
import * as Styles from './Map.styles';

import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

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
  const [map, setMap] = useState<?mapboxgl.Map>(null);
  const [utlaCoordinates, setUtlaCoordinates] = useState({});
  const mapContainer = useRef(null);

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
    if (map){
      const zoom = map.getZoom();
      if ((zoom < zoomLayers.country.min || zoom >= zoomLayers.country.max) && hash === '#countries') {
        map.zoomTo(zoomLayers.country.max - 0.5);
      }
      if ((zoom < zoomLayers.nhsRegion.min || zoom >= zoomLayers.nhsRegion.max) && hash === '#nhs-regions') {
        map.zoomTo(zoomLayers.nhsRegion.min);
      }
      if ((zoom < zoomLayers.localAuthority.min || zoom >= zoomLayers.localAuthority.max) && hash === '#local-authorities') {
        map.zoomTo(zoomLayers.localAuthority.min);
      }
    }
  }, [hash, map]);

  useEffect(() => {
    if (map) {
      if (country) {
        map.flyTo({center: [-4, 55], zoom: 4.5 });
      }
      if (nhsRegion) {
        map.flyTo({center: [-4, 55], zoom: 5 });
      }
      if (localAuthority) {
        const la = utlaCoordinates[localAuthority];
        if (la) {
          map.flyTo({center: [la.long, la.lat], zoom: 8 });
        }
      }
    }
  }, [country, nhsRegion, localAuthority]);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        accessToken: MAPBOX_API_KEY,
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v8',
        center: [-4, 55],
        zoom: 4.5,
        minZoom: 4,
        maxZoom: 12,
      });

      map.on('load', async () => {

        setMap(map);
        map.resize();

        map.addControl(new mapboxgl.NavigationControl({}), 'bottom-right');

        map.on('zoomend', () => {
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
        });

        addCountryLayer(map, countryData, c => {
          setCountry(c);
          setNhsRegion(null);
          setLocalAuthority(null);
        });
        addNhsRegionLayer(map, nhsRegionData, r => {
          setCountry(null);
          setNhsRegion(r);
          setLocalAuthority(null);
        });
        addEnglandLocalAuthorityLayer(map, localAuthorityData, la => {
          setCountry(null);
          setNhsRegion(null);
          setLocalAuthority(la);
        });
      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    }
  }, [map]);

  return (
    <Styles.Map ref={mapContainer} />
  );
};

export default withRouter(Map);

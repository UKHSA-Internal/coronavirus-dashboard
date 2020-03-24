/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import * as topojson from 'topojson';
import { max } from 'd3-array';

import { MAPBOX_API_KEY } from 'config';
import ukRegionGeojson from './uk_region.json';
import localAuthorities from './localAuthorities';
import population from './population';

import type { Props } from './Map.types';
import * as Styles from './Map.styles';

import 'mapbox-gl/dist/mapbox-gl.css';

const zoomLayers = {
  country: {
    min: 0, // Default min
    max: 5,
  },
  nhsRegion: {
    min: 5,
    max: 6,
  },
  localAuthority: {
    min: 6,
    max: 22, // Default max
  },
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
}: Props) => {
  const [map, setMap] = useState<?mapboxgl.Map>(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (map) {
      if (country) {
        map.flyTo({center: [-4, 55], zoom: 4.5 });
      }
      if (nhsRegion) {
        map.flyTo({center: [-4, 55], zoom: 5 });
      }
      if (localAuthority) {
        const reg = localAuthorities.find(r => r.name === localAuthority);
        if (reg) {
          map.flyTo({center: [reg.long, reg.lat], zoom: 8 });
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
        const [
          { data: englandTopo },
          // { data: scotlandTopo },
          // { data: walesTopo },
          // { data: niTopo },
        ] = await Promise.all([
          axios.get('https://martinjc.github.io/UK-GeoJSON/json/eng/topo_lad.json'),
          // axios.get('https://martinjc.github.io/UK-GeoJSON/json/sco/topo_lad.json'),
          // axios.get('https://martinjc.github.io/UK-GeoJSON/json/wal/topo_lad.json'),
          // axios.get('https://martinjc.github.io/UK-GeoJSON/json/ni/topo_wpc.json'),
        ]);

        setMap(map);
        map.resize();

        map.addControl(new mapboxgl.NavigationControl({}), 'bottom-right');

        const addNhsRegionAndCountryCounts = (g, key) => ({
          ...g,
          features: g.features.map(f => {
            const countryCount = ['Scotland', 'Wales', 'Northern Ireland'].includes(f.properties[key]) ? countryData?.[f.properties[key]]?.totalCases?.value ?? 0 : countryData?.['England']?.totalCases?.value ?? 0; 
            return {
              ...f,
              properties: {
                ...f.properties,
                countryCount,
                nhsRegionCount: countryData?.[f.properties[key]]?.totalCases?.value ?? 0, 
                name: f.properties[key],
              },
            }
          }),
        });
        const nhsRegionGeojson = addNhsRegionAndCountryCounts(ukRegionGeojson, 'name');
        map.addSource('nhs-regions', { 'type': 'geojson', 'data': nhsRegionGeojson });



        const addLocalAuthCounts = (g, key) => ({
          ...g,
          features: g.features.map(f => {
            const count = localAuthorityData?.[f.properties[key]]?.totalCases?.value ?? 0; 
            // const pop = population[f.properties.LAD13CD].pop; 
            // const rel = pop ? count / pop : 0;
            return {
              ...f,
              properties: {
                ...f.properties,
                count: count,
                name: f.properties[key],
              },
            }
          }),
        });
        const englandGeojson = addLocalAuthCounts(topojson.feature(englandTopo, englandTopo.objects.lad), 'LAD13NM');
        map.addSource('england-auths', { 'type': 'geojson', 'data': englandGeojson });
        // map.addSource('scotland-auths', { 'type': 'geojson', 'data': addCounts(topojson.feature(scotlandTopo, scotlandTopo.objects.lad), 'LAD13NM', regionData)});
        // map.addSource('wales-auths', { 'type': 'geojson', 'data': addCounts(topojson.feature(walesTopo, walesTopo.objects.lad), 'LAD13NM', regionData)});
        // map.addSource('ni-auths', { 'type': 'geojson', 'data': addCounts(topojson.feature(niTopo, niTopo.objects.wpc), 'LGDNAME', regionData)});

        const countryMax = max(Object.keys(countryData), d => countryData?.[d]?.totalCases?.value ?? 0);
        const nhsRegionMax = max(nhsRegionGeojson.features, d => d.properties.nhsRegionCount);
        const localAuthorityMax = max(englandGeojson.features, d => d.properties.count);

        // Layer 1 countries
        map.addLayer({
          'id': 'countries-fill',
          'type': 'fill',
          'source': 'nhs-regions',
          'minzoom': zoomLayers.country.min,
          'maxzoom': zoomLayers.country.max,
          'layout': {},
          'paint': {
            'fill-color': '#1D70B8',
            'fill-opacity': [
              'interpolate',
              ['linear'],
              ['get', 'countryCount'],
              0, 0,
              countryMax, 0.7,
            ],
          },
        });

        // Layer 2 nhs regions 
        map.addLayer({
          'id': 'nhs-regions-fill',
          'type': 'fill',
          'source': 'nhs-regions',
          'minzoom': zoomLayers.nhsRegion.min,
          'maxzoom': zoomLayers.nhsRegion.max,
          'layout': {},
          'paint': {
            'fill-color': '#1D70B8',
            'fill-opacity': [
              'interpolate',
              ['linear'],
              ['get', 'nhsRegionCount'],
              0, 0,
              nhsRegionMax, 1,
            ],
          },
        });
        map.addLayer({
          'id': 'nhs-regions-boundries',
          'type': 'line',
          'source': 'nhs-regions',
          'minzoom': zoomLayers.nhsRegion.min,
          'maxzoom': zoomLayers.nhsRegion.max,
          'layout': {},
          'paint': {
            'line-color': '#0b0c0c',
            'line-opacity': 0.5,
            'line-width': {
              "stops": [[3, 0.5], [5, 1], [13, 3]]
            },
          },
        });

        // Layer 3 local authorities 
        map.addLayer({
          'id': 'england-auths-fill',
          'type': 'fill',
          'source': 'england-auths',
          'minzoom': zoomLayers.localAuthority.min,
          'maxzoom': zoomLayers.localAuthority.max,
          'layout': {},
          'paint': {
            'fill-color': '#1D70B8',
            'fill-opacity': [
              'interpolate',
              ['linear'],
              ['get', 'count'],
              0, 0,
              localAuthorityMax, 1,
            ],
          },
        });
        map.addLayer({
          'id': 'england-auths-boundries',
          'type': 'line',
          'source': 'england-auths',
          'minzoom': zoomLayers.localAuthority.min,
          'maxzoom': zoomLayers.localAuthority.max,
          'layout': {},
          'paint': {
              'line-color': '#0b0c0c',
              'line-opacity': 0.5,
              'line-width': {
                "stops": [[3, 0.5], [5, 1], [13, 3]]
              }
          },
        });
        map.on('click', 'england-auths-fill', e => {
          setCountry(null);
          setNhsRegion(null);
          setLocalAuthority(e.features[0].properties.name);
        });

        
        // Commented code below is for local authorities for countries without data

        // map.addLayer({
        //   'id': 'scotland-auths-fill',
        //   'type': 'fill',
        //   'source': 'scotland-auths',
        //   'minzoom': 5,
        //   'layout': {},
        //   'paint': {
        //     'fill-color': '#1D70B8',
        //     'fill-opacity': [
        //       'interpolate',
        //       ['linear'],
        //       ['get', 'count'],
        //       0, 0,
        //       localAuthorityMax, 1,
        //     ],
        //   },
        // });
        // map.addLayer({
        //   'id': 'scotland-auths',
        //   'type': 'line',
        //   'source': 'scotland-auths',
        //   'minzoom': 5,
        //   'layout': {},
        //   'paint': {
        //       'line-color': '#0b0c0c',
        //       'line-opacity': 0.5,
        //       'line-width': {
        //         "stops": [[3, 0.5], [5, 1], [13, 3]]
        //       }
        //   },
        // });
        // map.on('click', 'scotland-auths-fill', e => {
        //   setRegion(e.features[0].properties.name);
        // });

        // map.addLayer({
        //   'id': 'wales-auths-fill',
        //   'type': 'fill',
        //   'source': 'wales-auths',
        //   'minzoom': 5,
        //   'layout': {},
        //   'paint': {
        //     'fill-color': '#1D70B8',
        //     'fill-opacity': [
        //       'interpolate',
        //       ['linear'],
        //       ['get', 'count'],
        //       0, 0,
        //       localAuthorityMax, 1,
        //     ],
        //   },
        // });
        // map.addLayer({
        //   'id': 'wales-auths',
        //   'type': 'line',
        //   'source': 'wales-auths',
        //   'minzoom': 5,
        //   'layout': {},
        //   'paint': {
        //       'line-color': '#0b0c0c',
        //       'line-opacity': 0.5,
        //       'line-width': {
        //         "stops": [[3, 0.5], [5, 1], [13, 3]]
        //       }
        //   },
        // });
        // map.on('click', 'wales-auths-fill', e => {
        //   setRegion(e.features[0].properties.name);
        // });

        // map.addLayer({
        //   'id': 'ni-auths-fill',
        //   'type': 'fill',
        //   'source': 'ni-auths',
        //   'minzoom': 5,
        //   'layout': {},
        //   'paint': {
        //     'fill-color': '#1D70B8',
        //     'fill-opacity': [
        //       'interpolate',
        //       ['linear'],
        //       ['get', 'count'],
        //       0, 0,
        //       localAuthorityMax, 1,
        //     ],
        //   },
        // });
        // map.addLayer({
        //   'id': 'ni-auths',
        //   'type': 'line',
        //   'source': 'ni-auths',
        //   'minzoom': 5,
        //   'layout': {},
        //   'paint': {
        //       'line-color': '#0b0c0c',
        //       'line-opacity': 0.5,
        //       'line-width': {
        //         "stops": [[3, 0.5], [5, 1], [13, 3]]
        //       }
        //   },
        // });
        // map.on('click', 'ni-auths-fill', e => {
        //   setRegion(e.features[0].properties.name);
        // });

        /*
        map.addSource('cases-counts', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': regions.map(r => ({
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [r.long, r.lat],
              },
              'properties': {
                'count': data[r.name].totalCases.value,
                'name': r.name,
              },
            })),
          },
        });
        map.addLayer({
          'id': 'cases-counts',
          'type': 'circle',
          'source': 'cases-counts',
          'minzoom': 5,
          'paint': {
            'circle-color': '#1D70B8',
            'circle-opacity': 0.4,
            'circle-radius': [
              'step',
              ['get', 'count'],
              0,
              1, 16,
              3, 33.45,
              8, 45.09,
              11, 62.55,
              14, 80,
            ],
          },
        });
        */
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

export default Map;

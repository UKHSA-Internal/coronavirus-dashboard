// @flow

import axios from 'axios';
import * as topojson from 'topojson';
import { max } from 'd3-array';

import zoomLayers from './zoomLayers';
import localAuthorities from './localAuthorities';


const addEnglandLocalAuthorityLayer = async (map, localAuthorityData, onClick) => {
  const { data: englandTopo } = await axios.get('https://martinjc.github.io/UK-GeoJSON/json/eng/topo_lad.json');

  const localAuthorityMax = max(Object.keys(localAuthorityData), d => localAuthorityData?.[d]?.totalCases?.value ?? 0);

  const addCounts = g => ({
    ...g,
    features: g.features.map(f => ({
        ...f,
        properties: {
          ...f.properties,
          count: localAuthorityData?.[f.properties.LAD13NM]?.totalCases?.value ?? 0, 
          name: f.properties.LAD13NM,
        },
    })),
  });

  const englandGeojson = addCounts(topojson.feature(englandTopo, englandTopo.objects.lad));
  map.addSource('england-auths', { 'type': 'geojson', 'data': englandGeojson });


  map.addSource('england-latlong', {
    type: 'geojson',
    data: {
      type: "FeatureCollection",
      features: localAuthorities.map(la => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [la.long, la.lat],
          },
          properties: {
            name: la.name,
            count: localAuthorityData?.[la.name]?.totalCases?.value ?? 0, 
          },
      })),
    },
  });

  map.addLayer({
    'id': 'england-auths-circles',
    'type': 'circle',
    'source': 'england-latlong',
    'minzoom': zoomLayers.localAuthority.min,
    'maxzoom': zoomLayers.localAuthority.max,
    'layout': {},
    'paint': {
      'circle-color': '#1D70B8',
      'circle-opacity': 0.6,
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'count'],
        0, 0,
        1, 5,
        localAuthorityMax, 25,
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

  map.addLayer({
    'id': 'england-auths-fill',
    'type': 'fill',
    'source': 'england-auths',
    'minzoom': zoomLayers.localAuthority.min,
    'maxzoom': zoomLayers.localAuthority.max,
    'layout': {},
    'paint': {
      'fill-opacity': 0,
    },
  });
  map.on('click', 'england-auths-fill', e => {
    onClick(e.features[0].properties.name);
  });
};

export default addEnglandLocalAuthorityLayer;
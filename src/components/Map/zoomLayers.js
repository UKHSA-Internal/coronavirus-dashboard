// @flow

const zoomLayers = {
  country: {
    min: 0, // Default min
    max: 5,
  },
  nhsRegion: {
    min: 5,
    max: 7,
  },
  localAuthority: {
    min: 7,
    max: 22, // Default max
  },
};

export default zoomLayers;
// @flow

const zoomLayers = {
  country: {
    min: 0, // Default min
    max: 6,
  },
  region: {
    min: 6,
    max: 8,
  },
  localAuthority: {
    min: 8,
    max: 22, // Default max
  },
};

export default zoomLayers;
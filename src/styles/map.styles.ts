import { LayerProps } from 'react-map-gl/mapbox';

export const directionStepLayer: LayerProps = {
  type: 'line',
  paint: {
    'line-color': '#ff0000',
    'line-width': 5,
  },
};

export const directionTollStepLayer: LayerProps = {
  type: 'line',
  paint: {
    'line-color': '#0000ff',
    'line-width': 5,
  },
};

export const tollGateLayer: LayerProps = {
  type: 'circle',
  paint: {
    'circle-color': '#0000ff',
    'circle-radius': 2,
  },
};

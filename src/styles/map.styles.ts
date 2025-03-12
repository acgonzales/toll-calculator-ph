import { LayerProps } from 'react-map-gl/mapbox';

export const directionStepLayer: LayerProps = {
  type: 'line',
  layout: {
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#0000ff',
    'line-width': 3,
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

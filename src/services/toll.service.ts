import { TollGate, RouteTollPrice, TollGateGeoJsonType, RouteLegStep } from '@/types/common.types';
import { ExpresswayRfidMap } from '@/config/toll-matrix';
import * as turf from '@turf/turf';

const getTollPrice = (entry: TollGate, exit: TollGate): [number, number, number] => {
  if (entry === exit) {
    return [0, 0, 0];
  }

  const matrix = ExpresswayRfidMap[entry.expressway];
  return matrix.matrix[entry.name][exit.name];
};

export const getRouteTollPrices = (
  tollGates: TollGateGeoJsonType,
  steps: RouteLegStep[],
): RouteTollPrice[] => {
  const gates = tollGates.features;

  const result: RouteTollPrice[] = [];
  let currentEntry: TollGate | null = null;

  steps.forEach((step) => {
    const geometry = step.geometry;

    gates.forEach((gate) => {
      // If the geometry (line) crosses the toll gate
      if (turf.booleanCrosses(geometry, gate.geometry)) {
        if (gate.properties.type === 'entry' && !currentEntry) {
          currentEntry = gate.properties;
        } else if (gate.properties.type === 'exit' && currentEntry) {
          if (currentEntry.expressway !== gate.properties.expressway) {
            console.warn('Entry expressway and exit expressway does not match!');
            result.push({
              entry: currentEntry,
              exit: currentEntry,
              price: getTollPrice(currentEntry, currentEntry),
            });
            currentEntry = gate.properties;
          } else {
            result.push({
              entry: currentEntry,
              exit: gate.properties,
              price: getTollPrice(currentEntry, gate.properties),
            });
            currentEntry = null;
          }
        }
      }
    });
  });

  if (currentEntry) {
    result.push({
      entry: currentEntry,
      exit: currentEntry,
      price: getTollPrice(currentEntry, currentEntry),
    });
  }

  return result;
};

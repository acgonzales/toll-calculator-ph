import {
  Directions,
  DirectionStep,
  TollGate,
  DirectionsTollCalculation,
  DirectionsTollCalculationOverviewLeg,
} from '@/types/common.types';
import { ExpresswayRfidMap } from '@/config/toll-matrix';
import * as turf from '@turf/turf';

interface StepTollGate {
  step: DirectionStep;
  tollGate: TollGate;
}

const getStepTollGate = (
  tollGates: GeoJSON.FeatureCollection,
  directions: Directions,
): StepTollGate[] => {
  const stepTollGate: StepTollGate[] = [];

  directions.steps.forEach((step) => {
    tollGates.features.forEach((tollGate) => {
      if (tollGate.geometry.type === 'Polygon') {
        if (turf.booleanCrosses(step.geometry, tollGate as GeoJSON.Feature<GeoJSON.Polygon>)) {
          if (!stepTollGate.some((toll) => toll.tollGate.name === tollGate.properties?.name)) {
            stepTollGate.push({
              step,
              tollGate: {
                name: tollGate.properties?.name,
                type: tollGate.properties?.type,
                expressway: tollGate.properties?.expressway,
              },
            });
          }
        }
      }
    });
  });

  return stepTollGate;
};

const combineSteps = (steps: DirectionStep[]): GeoJSON.FeatureCollection => {
  return turf.featureCollection(
    steps.map((step) => turf.lineString(step.geometry.coordinates as GeoJSON.Position[])),
  );
};

const getTollPrice = (entry: TollGate, exit: TollGate): number => {
  if (entry === exit) {
    return 0;
  }

  const matrix = ExpresswayRfidMap[entry.expressway];
  return matrix.matrix[entry.name][exit.name][0];
};

const getRfidType = (tollGate: TollGate): 'EasyTrip' | 'AutoSweep' => {
  const matrix = ExpresswayRfidMap[tollGate.expressway];
  return matrix.rfidType;
};

export const calculateToll = (
  tollGates: GeoJSON.FeatureCollection,
  directions: Directions,
): DirectionsTollCalculation => {
  const legs: DirectionsTollCalculationOverviewLeg[] = [];
  const stepTollGate = getStepTollGate(tollGates, directions);

  let currentSteps: DirectionStep[] = [];
  let currentEntry: TollGate | null = null;
  let isInTollRoad = false;

  let easyTripTotal = 0;
  let autoSweepTotal = 0;

  directions.steps.forEach((step) => {
    const tollGate = stepTollGate.find((toll) => toll.step.id === step.id);

    // If this step has a toll gate
    if (tollGate) {
      const isTollEntry = tollGate.tollGate.type === 'entry';
      const isTollExit = tollGate.tollGate.type === 'exit';

      // Found an entry toll gate
      if (isTollEntry) {
        // If we're not already in a toll road, this is a new entry
        if (!isInTollRoad) {
          // If we have collected steps outside a toll section, create a non-toll leg
          if (currentSteps.length > 0) {
            legs.push({
              type: 'regular',
              steps: [...currentSteps],
              geometry: combineSteps([...currentSteps]),
            });
            currentSteps = [];
          }

          // Mark that we're now in a toll road and set the entry
          isInTollRoad = true;
          currentEntry = tollGate.tollGate;
          currentSteps.push(step);
        }
        // If we're already in a toll road and find another entry,
        // handle the edge case
        else {
          console.warn('Found entry toll gate while already in toll road. Using the new entry.');
          currentEntry = tollGate.tollGate;
          currentSteps.push(step);
        }
      }
      // Found an exit toll gate
      else if (isTollExit) {
        // If we're in a toll road, we've found a matching exit
        if (isInTollRoad && currentEntry) {
          // Add the current step (which has the exit)
          currentSteps.push(step);

          const tollPrice = getTollPrice(currentEntry, tollGate.tollGate);
          if (tollPrice > 0) {
            if (getRfidType(currentEntry) === 'EasyTrip') {
              easyTripTotal += tollPrice;
            } else {
              autoSweepTotal += tollPrice;
            }
          }

          // Create a toll leg
          legs.push({
            type: 'toll',
            steps: [...currentSteps],
            entry: currentEntry,
            exit: tollGate.tollGate,
            geometry: combineSteps([...currentSteps]),
            price: tollPrice,
          });

          // Reset for the next section
          currentSteps = [];
          currentEntry = null;
          isInTollRoad = false;
        }
        // If we found an exit but weren't in a toll road, just treat it as a regular step
        else {
          currentSteps.push(step);
        }
      }
      // For any other toll gate type, just add the step
      else {
        currentSteps.push(step);
      }
    }
    // Regular step (no toll gate)
    else {
      currentSteps.push(step);
    }
  });

  // Handle any remaining steps (if route ends while still in a toll road or after last toll gate)
  if (currentSteps.length > 0) {
    if (isInTollRoad && currentEntry) {
      // We're still in a toll road without an exit - this is an edge case
      legs.push({
        type: 'toll',
        steps: [...currentSteps],
        entry: currentEntry,
        exit: currentEntry, // No proper exit, using entry as a placeholder
        geometry: combineSteps([...currentSteps]),
        price: getTollPrice(currentEntry, currentEntry),
      });
    } else {
      // Regular non-toll leg
      legs.push({
        type: 'regular',
        steps: [...currentSteps],
        geometry: combineSteps([...currentSteps]),
      });
    }
  }

  return {
    directions,
    overview: legs,
    easyTripTotal,
    autoSweepTotal,
    total: easyTripTotal + autoSweepTotal,
  };
};

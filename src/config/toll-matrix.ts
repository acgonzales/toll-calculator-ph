import { TollPriceMatrixEntry, TollPriceMatrix, ExpressWayRfidMatrix } from '@/types/common.types';
import nlexSctexTollMatrix from '@/data/nlex-sctex-toll-matrix.json';

// TODO: Autosweep Toll Matrix
export const AutoSweepMatrix: TollPriceMatrix = {
  rfidType: 'AutoSweep',
  matrix: {},
};

export const EasyTripMatrix: TollPriceMatrix = {
  rfidType: 'EasyTrip',
  matrix: nlexSctexTollMatrix as unknown as TollPriceMatrixEntry,
};

export const ExpresswayRfidMap: ExpressWayRfidMatrix = {
  NLEX: EasyTripMatrix,
};

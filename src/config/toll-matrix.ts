import { TollPriceMatrix, ExpressWayRfidMatrix } from '@/types/common.types';

// TODO: Complete toll matrix

export const AutoSweepMatrix: TollPriceMatrix = {
  rfidType: 'AutoSweep',
  matrix: {},
};

export const EasyTripMatrix: TollPriceMatrix = {
  rfidType: 'EasyTrip',
  matrix: {
    Mexico: {
      'San Fernando': [37, 92, 110],
      Angeles: [44, 201, 242],
      Dau: [54, 228, 274],
    },
    'San Fernando': {
      Mexico: [37, 92, 110],
      Angeles: [81, 201, 242],
      Dau: [91, 228, 274],
    },
  },
};

export const ExpresswayRfidMap: ExpressWayRfidMatrix = {
  NLEX: EasyTripMatrix,
};

import { type TollBooth } from '../types/common.types';

const TOLL_BOOTHS: TollBooth[] = [
  {
    name: 'NLEX - San Fernando Northbound',
    type: 'entry',
    rfidType: 'EasyTrip',
    coordinates: {
      latitude: 15.051368778512074,
      longitude: 120.69550399425889,
    },
  },
  {
    name: 'NLEX - Mexico',
    type: 'exit',
    rfidType: 'EasyTrip',
    coordinates: {
      latitude: 15.108334486084722,
      longitude: 120.66313747650224,
    },
  },
];

export { TOLL_BOOTHS };

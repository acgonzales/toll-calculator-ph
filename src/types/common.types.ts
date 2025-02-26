type Coordinates = {
    latitude: number;
    longitude: number;
}

type TollBooth = {
    name: string;
    type: 'entry' | 'exit';
    rfidType: 'EasyTrip' | 'AutoSweep';
    coordinates: Coordinates;
}

export { type TollBooth };
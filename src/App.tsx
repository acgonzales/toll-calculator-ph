import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';

import { TOLL_BOOTHS } from './config/constants';

import '../node_modules/leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <div>Hello World</div>
      <MapContainer
        style={{ height: 600 }}
        center={[15.052702644445736, 120.6988260091832]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {TOLL_BOOTHS.map((booth) => (
          <CircleMarker
            pathOptions={{ color: booth.type == 'entry' ? 'blue' : 'red' }}
            center={[booth.coordinates.latitude, booth.coordinates.longitude]}
            radius={20}
          >
            <Popup>{booth.name}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
}

export default App;

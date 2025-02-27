import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import '../node_modules/leaflet/dist/leaflet.css';
import LocationInput from '@/components/location-input';
import { TOLL_BOOTHS } from '@/config/constants';
import useLocationInput from '@/hooks/useLocationInput';

function App() {
  const origin = useLocationInput();
  const destination = useLocationInput();

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">&#x1f1f5;&#x1f1ed; Toll Calculator</h1>
        <div className="card bg-base-100 w-100 shadow-sm">
          <div className="card-body">
            <LocationInput
              label="Origin"
              value={origin.value}
              suggestions={origin.suggestions}
              onChange={(e) => origin.handleChange(e.target.value)}
              selectSuggestion={(suggestion) => origin.selectSuggestion(suggestion)}
            />
            <LocationInput
              label="Destination"
              value={destination.value}
              suggestions={destination.suggestions}
              onChange={(e) => destination.handleChange(e.target.value)}
              selectSuggestion={(suggestion) => destination.selectSuggestion(suggestion)}
            />
            <div className="card-actions">
              <button className="btn btn-primary w-full">Calculate</button>
            </div>
          </div>
        </div>
      </div>

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
            key={booth.name}
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

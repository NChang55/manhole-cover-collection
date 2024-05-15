import { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ImageUpload from './components/ImageUpload';

function App() {

  return (
    <div className="main_content">
      <h1>Manhole Covers Collection</h1>
      <ImageUpload></ImageUpload>
      <MapContainer center={[38.066862, 138.164063]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[38.066862, 138.164063]}>
          <Popup>
            A pretty CSS3 popup. <br /> Clickable URL to come.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default App

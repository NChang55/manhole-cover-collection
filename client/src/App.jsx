import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ImageUpload from './components/ImageUpload';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLIENT_URL = "http://localhost:5173";

function App() {
  const [allEntries, setAllEntries] = useState([]);

  // useEffect
  useEffect(() => {
    getAllEntries();
    }, []);

  // handler functions
  async function getAllEntries() {
    const entries = await fetch(`${BASE_URL}/allEntries`);
    const jsonentries = await entries.json();
    setAllEntries(jsonentries);
  }

  const handleImageClick = (url) => {
    window.open(url, 'Image', 'width=800,height=450');
  };

  return (
    <div className="main_content">
      <div className="header">
        <h1>Manhole Covers Collection</h1>
        <ImageUpload></ImageUpload>
      </div>
      <MapContainer center={["38.066862", "138.164063"]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allEntries.map(entry => (
          <Marker key={entry.entry_id} position={[entry.latitude, entry.longitude]}>
            <Popup>
              <button
                onClick={() => handleImageClick(entry.image_url)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              >
                View Image
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default App

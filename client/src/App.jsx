import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ImageUpload from './components/ImageUpload';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLIENT_URL = "http://localhost:5173";

function App() {
  const [allEntries, setAllEntries] = useState(null);

  // useEffect
  useEffect(() => {
    getAllEntries();
    console.log("yoooo");
    }, []);

  // handler functions
  async function getAllEntries() { 
    const entries = await fetch(`${BASE_URL}/allEntries`,
    {
      method: "GET",
      headers: {
        "Origin": `${CLIENT_URL}`,
        "Access-Control-Request-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Request-Method": "GET",
      },
    }) ;
    console.log("base_url: ", BASE_URL);
    console.log("all entries: ", entries);
    const jsonentries = await entries.json();
    setAllEntries(jsonentries);
    console.log(allEntries);
  }

  return (
    <div className="main_content">
      <h1>Manhole Covers Collection</h1>
      <ImageUpload></ImageUpload>
      <MapContainer center={["38.066862", "138.164063"]} zoom={5} scrollWheelZoom={true}>
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

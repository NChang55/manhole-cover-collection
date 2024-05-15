import React, { useState, useEffect } from "react";
import exifr from "exifr";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// FIREBASE
import "./ImageUpload.css";
import { storage } from "../../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { select } from "../../../server/src/knex";

export default function ImageUpload({ setIsNewEntry, handleClose }) {
  // USE STATE
  const [imageURL, setImageURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [geolocation, setGeolocation] = useState(null);

  // USE EFFECT
  
//   useEffect(() => {
//     if (imageURL) {
//       handleUploadToDatabase();
//     }
//   }, [imageURL]);

  // HANDLER FUCNTION
  const storage = getStorage();

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      const gpsData = await exifr.gps(selectedFile);
      if (gpsData && gpsData.latitude && gpsData.longitude) {
        setGeolocation({ lat: gpsData.latitude, lng: gpsData.longitude });
      } else {
        alert("No geolocation data found in the image.");
      }
    } catch (error) {
      console.error("Error extracting GPS data:", error);
      alert("Failed to extract GPS data.");
    }
      }

//   const handleUploadToDatabase = async () => {
//     await uploadToDatabase();
//     setIsNewEntry((prev) => prev + 1);
//     handleClose();
//   };

  // upload file to Firebase
//   const uploadFile = async () => {
//     if (!selectedFile) return;
//     const manholeCoversFolderRef = ref(
//       storage,
//       `manhole_covers/${selectedFile.name}`
//     );
//     const metadata = {
//         contentType: 'image/jpeg',
//       };
//     try {
//       const snapshot = await uploadBytes(manholeCoversFolderRef, selectedFile, metadata);
//       const firebaseURL = await getDownloadURL(snapshot.ref);
//       setImageURL(firebaseURL);
//     } catch (err) {
//       console.error("image upload unsuccessful :(", err);
//     }
//   };

  // upload to Database
//   const uploadToDatabase = async () => {
//     const username = localStorage.getItem("userId");
//     const userID = Number(username);
//     const token = localStorage.getItem("jwtToken");
//     const response = await fetch(`${BASE_URL}/diaries`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         userID: userID,
//         imageURL: imageURL,
//       }),
//     });
//   };

  // RETURN
  return (
    <div>
    <input label="Select File" type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
      {geolocation && (
        <div>
          <p>Latitude: {geolocation.lat}</p>
          <p>Longitude: {geolocation.lng}</p>
        </div>
      )}
    </div>
  );
};

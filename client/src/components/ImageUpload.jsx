import React, { useState, useEffect, useRef } from "react";
import exifr from "exifr";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// FIREBASE
import "./ImageUpload.css";
import { storage } from "../../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { select } from "../../../server/src/knex";

export default function ImageUpload({ uploadComplete }) {
  // USE STATE
  const [imageURL, setImageURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [geolocation, setGeolocation] = useState(null);

  // USE EFFECT
  
  useEffect(() => {
    if (imageURL && geolocation) {
      uploadDB();
      window.location.reload(); //refresh page and get all entries again
    }
  }, [imageURL, geolocation]);

  // HANDLER FUCNTION
  const storage = getStorage();

  // styling file select input button
  const hiddenFileSelect = useRef(null);

  const handleSelectClick = (event) => {
    hiddenFileSelect.current.click();
  };

  // processing React file upload
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    await extGeolocation(file);
  }

  const extGeolocation = async (selectedFile) => {
    if (!selectedFile) return;
    try {
      const gpsData = await exifr.gps(selectedFile);
      if (gpsData && gpsData.latitude && gpsData.longitude) {
        setGeolocation({ latitude: gpsData.latitude, longitude: gpsData.longitude });
      } else {
        alert("No geolocation data found in the image.");
      }
    } catch (error) {
      console.error("Error extracting GPS data:", error);
      alert("Failed to extract GPS data.");
    }
      }

  // upload file to Firebase
  const uploadFirebase = async () => {
    if (!selectedFile) return;
    const manholeCoversFolderRef = ref(
      storage,
      `manhole_covers/${selectedFile.name}`
    );
    try {
      const snapshot = await uploadBytes(manholeCoversFolderRef, selectedFile);
      const firebaseURL = await getDownloadURL(snapshot.ref);
      setImageURL(firebaseURL);
      alert("image upload successful!");
    } catch (err) {
      console.error("image upload unsuccessful :(", err);
    }
  };

  // upload to Database
  const uploadDB = async () => {
    if (!geolocation || !imageURL) return;
    console.log("image URL: ", imageURL);

    await fetch(`${BASE_URL}/newEntry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
        img_url: imageURL,
      }),
    });
  };

  const handleUpload = async () => {
    await uploadFirebase();
  };

  // RETURN
  return (
    <div>
    <button onClick={handleSelectClick}>Select</button>
    <input type="file" ref={hiddenFileSelect} style={{display:"none"}} onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

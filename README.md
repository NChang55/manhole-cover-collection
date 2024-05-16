# Manhole Cover Collection

This project is a web-based application for uploading images of manhole covers, which will then be displayed and marked with pins on an interactive map according to geolocation of the images. The application is available to public for everyone to share/show off their beautiful collections of manhole covers all over Japan and the world!

## Tech Stack

- Project Structure: Monolith
- Programming Language: JavaScript
- Frontend: React, Leaflet, React Leaflet, Exifr, Firebase (picture storage)
- Backend: Node.js, Express, PostgreSQL
- Backend Framework: Node.js

## Installation

1. Fork the repository and clone it locally. Install the necessary dependancies using 'npm i' and 'npm i --dev' in the server directory and 'npm i' in the client directory.

2. Register or use existing Firebase account, initiate a new app and storage.

3. Create a postgresql database to store our user data, connect to the database. Create a local environment file '.env.local' or '.env' using the provided '.env'.example in the server directory as well as the client directory. Be sure to have postgresql 14 or higher installed on your local machine. Store the link to the server as: VITE_BASE_URL.

4. Server side:
    a. Run 'npm run migrate-latest' to run migrations on the database
    b. Run 'npm run express-dev' to run server on Nodemon, or 'npm start' to run on Node

5. Client side:
    a. npm run dev to run Vite

## Usage

Click the 'Select' button to upload a manhole-cover image with geolocation data. The application will throw an error if the image does not contain latitude and longitude information. Then, click 'Upload' to upload the image to Firebase storage, which will also store the geolocation data and the image URL from Firebase to Postgres database. The data will then be fetched from the database to populate the map with pins and links to view uploaded images.

## Libraries and Packages

This project wouldn't be possible without the following open-source libraries and packages:

- **[cors](https://github.com/expressjs/cors)**
- **[dotenv](https://github.com/motdotla/dotenv)**
- **[exifr](https://github.com/MikeKovarik/exifr)** 
- **[express](https://expressjs.com/)**
- **[firebase](https://firebase.google.com/)**
- **[knex](https://knexjs.org/)**
- **[Leaflet](https://leafletjs.com/)**
- **[nodemon](https://nodemon.io/)**
- **[pg](https://node-postgres.com/)**
- **[react](https://reactjs.org/)**
- **[react-dom](https://reactjs.org/docs/react-dom.html)**
- **[OpenStreetMap](https://www.openstreetmap.org/)**
- **[React Leaflet](https://react-leaflet.js.org/)**

## Contributing

Pull requests are welcome. For major changes, please email first to discuss what you would like to change.

## Link

https://manhole-cover-collection-fe.onrender.com/
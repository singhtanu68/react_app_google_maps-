
import React, { useState, useEffect } from "react";
import Home from "./Home";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
  } from "react-google-maps";
  import mapStyles from './mapStyles'
  import * as PointData from "./data/pointData.json";
  
  
  function Map() {
    const [selectedPark, setSelectedPoint] = useState(null);
  
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedPoint(null);
        }
      };
      window.addEventListener("keydown", listener);
  
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);
  

    return (
      <GoogleMap
        defaultZoom={19}
        defaultCenter={{ lat: 43.6561, lng: -79.3802}}
        options={{ styles: mapStyles }}
      >
        {PointData.features.map(park => (
          <Marker

            position={{
              lat: park.coordinates[1],
              lng: park.coordinates[0]
            }}
            onClick={() => {
              setSelectedPoint(park);
            }}
            icon={{
              url:  "https://img.icons8.com/color/48/000000/map-pin.png",
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        ))}
  
        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPoint(null);
            }}
            position={{
              lat: selectedPark.coordinates[1],
              lng: selectedPark.coordinates[0]
            }}
          >
          
          </InfoWindow>
        )}
      </GoogleMap>
      
    );
  }
  
  const MapWrapped = withScriptjs(withGoogleMap(Map));
  
  export default function Main() {
    return (
        <HashRouter>
        <div>
          <h1>Google Maps Integration using ReactJS</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
          
          </ul>
          <div className="content">
            <Route path="/" component={Home}/>
          </div>
        </div>
    
  
      <div style={{ width: "97vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAzo9Xzk5QwuAixqF8Kxdxp1zgMfL2DtKA&v=3.exp&libraries=geometry,drawing,places}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      </HashRouter>
    
      );
}
  
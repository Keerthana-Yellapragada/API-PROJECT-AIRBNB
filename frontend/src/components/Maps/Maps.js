// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Maps = ({ apiKey, currentSpot}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });


  const containerStyle = {
    width: '100%',
    height: '500px',

  };

  console.log("CURRSPOTMAPS", currentSpot)

  // const center = {
  //   lat: 37.33,
  //   lng:-121.88
  // };
   const center = {
     lat: currentSpot?.lat,
     lng: currentSpot?.lng
   };

  const svgMarker = {
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  }


  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          <Marker
            icon={svgMarker}
            position={center}
          />
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);

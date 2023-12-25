import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const loadMap = () => {
    const mapOptions = { // Replace with your Bing Maps API Key
    };
    const map = new window.Microsoft.Maps.Map(mapRef.current, mapOptions);
   let singleMarker=null;
    // Load the DrawingTools module
    window.Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', () => {
      const tools = new window.Microsoft.Maps.DrawingTools(map);
      tools.showDrawingManager((manager) => {
        // Add a click event listener to the map
        window.Microsoft.Maps.Events.addHandler(map, 'click', (e) => {
          // Store the latitude and longitude of the clicked location
          const clickedLocation = {
            latitude: e.location.latitude,
            longitude: e.location.longitude,
          };
          // Remove existing marker if present
          if (singleMarker) {
            map.entities.remove(singleMarker);
          }

          // Create a marker at the clicked location
          const newMarker = new window.Microsoft.Maps.Pushpin(
            new window.Microsoft.Maps.Location(
              clickedLocation.latitude,
              clickedLocation.longitude
            )
          );
          // Add the marker to the map
          map.entities.push(newMarker);
          singleMarker=newMarker;

          // Log the last clicked location to localStorage
          localStorage.setItem('latitude', clickedLocation.latitude);
          localStorage.setItem('longitude', clickedLocation.longitude);
        });
      });
    });
  };

  useEffect(() => {
    loadMap();
  }, []);

  return <div id="myMap" style={{ width: '100%', height: '500px' }} ref={mapRef} />;
};

export default MapComponent;
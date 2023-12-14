import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  state = {
    markerPosition: null,
    address: null
  };

  handleClick = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);

    // Call the geocodeLatLng function with the clicked coordinates
    this.geocodeLatLng(latLng, (address) => {
      // Update the marker position and address in the component state
      this.setState({ markerPosition: latLng, address: address });
      console.log(address);
    });
  };

  geocodeLatLng = (latLng, callback) => {
    const geocoder = new this.props.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          // Extract the address components
          const addressComponents = results[0].address_components;
          // Find the address name and street name components
          const addressName = addressComponents.find(component =>
            component.types.includes("route")
          );
          const streetName = addressComponents.find(component =>
            component.types.includes("street_number")
          );

          const address =
            (addressName ? addressName.long_name : "") +
            " " +
            (streetName ? streetName.long_name : "");

          callback(address);
        } else {
          callback("No results found");
        }
      } else {
        callback("Geocoder failed due to: " + status);
      }
    });
  };

  render() {
    const mapStyles = {
      width: "1205px",
      height: "500px",
      position: "relative"
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 37.7749, lng: -122.4194 }}
        onClick={this.handleClick}
        className="map"
      >
        {this.state.markerPosition && (
          <Marker position={this.state.markerPosition} title={this.state.address} />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCr-NNkiB1f6x1nMU1wDe6cGrvlO09jeIo",
})(MapContainer);
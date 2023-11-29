import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  state = {
    markerPosition: null
  };
  
  handleClick = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    this.setState({ markerPosition: latLng });
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
          <Marker position={this.state.markerPosition} />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCr-NNkiB1f6x1nMU1wDe6cGrvlO09jeIo",
})(MapContainer);
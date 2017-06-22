import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

class Geolocate extends Component {
    constructor(props){
        super(props);
    this.handleSetCoords = this.handleSetCoords.bind(this);
    }

    render() {
        if (!this.props.isGeolocationAvailable) {
            return (
                <div>Sorry, geolocation is unavailable.</div>
            );
        } else {
            if (!this.props.isGeolocationEnabled) {
                return(
                    <div>Geolocation is not enabled.</div>
                );
            } else {
                if (this.props.coords) {
                    return(
                        <div>
                            <h2>Your location</h2>
                            <div>Latitude: {this.props.coords.latitude}</div>
                            <div>Longitude: {this.props.coords.longitude}</div>
                            <button onClick={this.handleSetCoords}>Use this location</button>
                        </div>
                    );
                } else {
                    return(
                        <div>Fetching location data..</div>
                    );
                }

            }
        }
    }

  handleSetCoords() {
      this.props.setCoords({
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
          address: "Your location"
      });
  }

}

export default geolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 7000
})(Geolocate);

import React, { Component } from 'react';
import Geolocate from './Geolocate';
// import axios from 'axios';

class WxApp extends Component {
    constructor() {
        super();
        this.state = {
            lat: null,
            lng: null
        }
        this.setCoords = this.setCoords.bind(this);
    }

    render() {
        return(
            <div>
                <h1> Working...</h1>
                <Geolocate setCoords={this.setCoords} />
                <div>
                    Current coordinates:
                    Lat: {this.state.lat}
                    Lng: {this.state.lng}
                </div>
            </div>

        )
    }

    setCoords(props) {
        this.setState({
            lat: props.lat,
            lng: props.lng
        });
    }

}

export default WxApp;

import React, { Component } from 'react';
import axios from 'axios';

class GetLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: "",
            formattedAddress: "",
            lat: null,
            lng: null
        }
        this.updateAddress = this.updateAddress.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.handleSetCoords = this.handleSetCoords.bind(this);
    }

    render() {
        return(
            <div>
                <p>Enter address / location:</p>
                <input
                    type="text"
                    onChange={this.updateAddress}
                    value={this.state.address}
                    placeholder="Enter address/location"
                />
                <button onClick={this.getCoords}>Enter</button>
            </div>
        );
    }

    updateAddress(event) {
        this.setState({ address: event.target.value });
    }

    getCoords() {
        let encodedAddress = encodeURIComponent(this.state.address);
        let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

        axios.get(geocodeUrl).then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find address.');
            }

            let { location } = response.data.results[0].geometry;
            console.log(location);
            console.log(response.data.results[0].formatted_address);
            this.setState({
                lat: location.lat,
                lng: location.lng,
                formattedAddress: response.data.results[0].formatted_address
            },
            this.handleSetCoords);

        }).catch((error) => {
            if (error.code === 'ENOTFOUND') {
                console.log('Unable to connect to API servers.');
            } else {
                console.log(error.message);
            }
        });
    }

    handleSetCoords() {
        this.props.setCoords({
            lat: this.state.lat,
            lng: this.state.lng
        });
    }
}

export default GetLocation;
//

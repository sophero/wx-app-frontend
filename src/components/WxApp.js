import React, { Component } from 'react';
import Geolocate from './Geolocate';

class WxApp extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <h1> Working...</h1>
                <Geolocate />    
            </div>

        )
    }
}

export default WxApp;

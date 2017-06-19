import React, { Component } from 'react';
import Geolocate from './Geolocate';
import axios from 'axios';
const darkSkyApiKey = process.env.DARK_SKY_API_KEY;

class CurrentWx extends Component {
    constructor(props) {
        super(props);
    }

    getTime() {

    }

    render() {
        return(
            null
        );
    }
}

var date = new Date();
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
// var darkSkyApiKey = process.env.DARK_SKY_API_KEY;

// Using user input and google maps geocode API to grab lat longs.
// axios knows what to do with json data and returns a promise!
axios.get(geocodeUrl).then((response) => {

    // console.log(response.data);
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    console.log(lat, lng);
    console.log(response.data.results[0].formatted_address);

    var weatherUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`;

    // sending lat longs to darksky API and returning data from response

    return axios.get(weatherUrl).then((response) => {
        // console.log(response.data);
        var weekForecast = response.data.daily.summary;
        var dayForecast = response.data.hourly.summary;
        // console.log("Forecast summary:");
        // if (response.data.minutely) {
        //     var hourForecast = response.data.minutely.summary;
        // } else {
        //     console.log(dayForecast, weekForecast);
        // }
        // console.log(hourForecast, dayForecast, weekForecast);

        console.log(date.toUTCString());
        var temperature = response.data.currently.temperature;
        var dewPoint = response.data.currently.dewPoint;
        var pressure = response.data.currently.pressure;
        var windBearing = response.data.currently.windBearing;
        var windSpeed = response.data.currently.windSpeed;
        console.log(`It's currently ${temperature} Fahrenheit with a dewpoint ` +
            `of ${dewPoint}. The wind is coming from a bearing of ` +
            `${windBearing} degrees at ${windSpeed} mph. The MSLP is ${pressure} hPa.`);
    });
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(error.message);
    }
});

import React from "react";
import axios from "./axios";
import secrets from "./secrets.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log(secrets);
        const apiKey = secrets.apiKey;
        console.log(apiKey);
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=berlin&APPID=${apiKey}&units=metric`
            )
            .then(data => {
                console.log(data.data);
                this.setState({
                    result: data.data
                });
            })
            .catch(err => {
                console.log("err in api get", err);
            });
    }
    render() {
        console.log("state", this.state);
        let weather = this.state.result;
        if (!weather) {
            return null;
        }
        return (
            <div>
                <p>Weather app</p>
                <h1>{weather.name}</h1>
                <p>Current Temp: {weather.main.temp}</p>
                <p>Max Temp: {weather.main.temp_max}</p>
                <p>Min Temp: {weather.main.temp_min}</p>
                <p>Humidity: {weather.main.humidity}%</p>
            </div>
        );
    }
}

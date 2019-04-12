import React from "react";

export default class Current extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let weather = this.props.weather;
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

import React from "react";
import Navbar from "./navbar";
import { connect } from "react-redux";
import { getForecast } from "./actions";
const Skycons = require("skycons")(window);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.getWeather = this.getWeather.bind(this);
        this.state = {
            location: "Berlin, Germany",
            lat: "52.5200",
            long: "13.4050"
        };
    }

    componentDidMount() {
        this.props.dispatch(getForecast(this.state.lat, this.state.long));
    }
    componentDidUpdate() {
        const skycons = new Skycons({ color: "black" });
        const icon = this.props.forecastToday.icon;

        if (!icon) {
            return <h2>Loading...</h2>;
        }
        if (icon === "wind") {
            skycons.add(this.ref.current, Skycons.WIND);
            skycons.play();
        } else if (icon === "clear-day") {
            skycons.add(this.ref.current, Skycons.CLEAR_DAY);
            skycons.play();
        } else if (icon === "partly-cloudy-day") {
            skycons.add(this.ref.current, Skycons.PARTLY_CLOUDY_DAY);
            skycons.play();
        } else if (icon === "partly-cloudy-night") {
            skycons.add(this.ref.current, Skycons.PARTLY_CLOUDY_NIGHT);
            skycons.play();
        } else if (icon === "clear-night") {
            skycons.add(this.ref.current, Skycons.CLEAR_NIGHT);
            skycons.play();
        } else if (icon === "rain") {
            skycons.add(this.ref.current, Skycons.RAIN);
            skycons.play();
        } else if (icon === "snow") {
            skycons.add(this.ref.current, Skycons.SNOW);
            skycons.play();
        } else if (icon === "sleet") {
            skycons.add(this.ref.current, Skycons.SLEET);
            skycons.play();
        } else if (icon === "fog") {
            skycons.add(this.ref.current, Skycons.FOG);
            skycons.play();
        } else if (icon === "cloudy") {
            skycons.add(this.ref.current, Skycons.CLOUDY);
            skycons.play();
        } else {
            console.log("error!");
            skycons.add(this.ref.current, Skycons.CLOUDY);
            skycons.play();
        }
        console.log("triggered");

        // const skycons = new Skycons({ color: "black" });
        // const forecast = this.props.forecast;
        // skycons.add(this.ref.current, Skycons.CLEAR_DAY);
        // skycons.add(this.ref.current, Skycons.CLEAR_DAY);
        // skycons.play();
        // console.log(forecast.icon);
    }
    getWeather(val1, val2, val3) {
        console.log("getwethae", val1, val2);
        this.setState({ lat: val1, long: val2, location: val3 });
        this.props.dispatch(getForecast(val1, val2));
    }
    render() {
        if (!this.props.forecast) {
            return null;
        }

        if (!this.props.forecast.daily) {
            return null;
        }

        console.log("props", this.props);
        let forecast = this.props.forecast.daily.data;

        forecast.shift();
        forecast.pop();
        console.log("forecast", forecast);
        const forecastDaily = (
            <div className="row">
                {forecast.map(day => {
                    const icon = day.icon;
                    let image;

                    if (!icon) {
                        return <h2>Loading...</h2>;
                    }
                    if (icon === "wind") {
                        image = "/wind.svg";
                    } else if (icon === "clear-day") {
                        image = "/sun.svg";
                    } else if (icon === "partly-cloudy-day") {
                        image = "/cloud-sun.svg";
                    } else if (icon === "partly-cloudy-night") {
                        image = "/cloud-moon.svg";
                    } else if (icon === "clear-night") {
                        image = "/Moon-new.svg";
                    } else if (icon === "rain") {
                        image = "/umbrella.svg";
                    } else if (icon === "snow") {
                        image = "/snowflake.svg";
                    } else if (icon === "sleet") {
                        image = "/snowflake.svg";
                    } else if (icon === "fog") {
                        image = "/cloud-fog.svg";
                    } else if (icon === "cloudy") {
                        image = "/cloud.svg";
                    } else {
                        console.log("error!");
                        image = "/umbrella.svg";
                    }
                    let maxTemp = Math.round(day.temperatureHigh);
                    let minTemp = Math.round(day.temperatureLow);
                    return (
                        <div key={day.time} className="col-md-2">
                            <img src={image} />
                            <p>
                                {maxTemp}&deg;C / {minTemp}&deg;C
                            </p>
                        </div>
                    );
                })}
            </div>
        );
        let maxDailyTemp = Math.round(this.props.forecastToday.temperatureHigh);
        let minDailyTemp = Math.round(this.props.forecastToday.temperatureLow);
        return (
            <div>
                <Navbar
                    weather={this.state.result}
                    getWeather={this.getWeather}
                />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-3 pt-3">
                            <canvas ref={this.ref} width="300" height="300" />
                            <p>
                                {maxDailyTemp}&deg;C / {minDailyTemp}&deg;C
                            </p>
                            <p>
                                <i className="far fa-compass" />{" "}
                                {this.state.location}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>{forecastDaily}</div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    if (!state) {
        return null;
    } else {
        console.log("state in maptoP", state.forecast);
        return {
            current: state.forecast && state.forecast.currently,
            hourly: state.forecast && state.forecast.hourly,
            forecastToday: state.forecast && state.forecast.daily.data[0],
            forecast: state.forecast && state.forecast
        };
    }
};

export default connect(mapStateToProps)(App);

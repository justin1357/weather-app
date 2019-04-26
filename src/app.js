import React from "react";
import Navbar from "./navbar";
import DailyForecast from "./dailyforecast";
import ChartToday from "./charttoday";
import { connect } from "react-redux";
import { getForecast } from "./actions";
const Skycons = require("skycons")(window);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.getWeather = this.getWeather.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleXClick = this.handleXClick.bind(this);
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
        const icon = this.props.current.icon;

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
    }
    getWeather(val1, val2, val3) {
        this.setState({ lat: val1, long: val2, location: val3 });
        this.props.dispatch(getForecast(val1, val2));
    }
    handleClick(e) {
        e.preventDefault();
        this.setState({ chartIsVisible: true });
    }
    handleXClick(e) {
        e.preventDefault();
        this.setState({ chartIsVisible: false });
    }
    render() {
        if (!this.props.forecast) {
            return null;
        }

        if (!this.props.forecast.daily) {
            return null;
        }

        let y = this.props.current.humidity.toString();
        let x = y.split(".");
        let humidity = x[1];
        return (
            <div>
                <Navbar
                    weather={this.state.result}
                    getWeather={this.getWeather}
                />
                {this.state.chartIsVisible && (
                    <ChartToday
                        handleXClick={this.handleXClick}
                        hourly={this.props.forecast.hourly.data}
                    />
                )}
                <div className="container">
                    <div
                        className="row justify-content-center"
                        onClick={e => this.handleClick(e)}
                    >
                        <div className="col-md-5 pt-3">
                            <canvas ref={this.ref} width="300" height="300" />
                        </div>
                        <div className="col-md-3 pt-5">
                            <h5 className="pb-3">
                                <i className="far fa-compass" />{" "}
                                {this.state.location}
                            </h5>
                            <p>{this.props.current.summary}</p>
                            <p>
                                Currently: {this.props.current.temperature}{" "}
                                &deg;C
                            </p>
                            <p>Wind: {this.props.current.windSpeed} Km/h</p>

                            <p>Humidity: {humidity}%</p>
                            <p>UV Index: {this.props.current.uvIndex}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <DailyForecast forecast={this.props.forecast} />
                        </div>
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

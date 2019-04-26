import React from "react";

export default class DailyForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        var forecast = this.props.forecast.daily.data;
        console.log(forecast);
        // forecast.shift();
        // forecast.pop();
        const forecastDaily = (
            <div className="row justify-content-center">
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
                        image = "/Cloud-Rain.svg";
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

                    let date = new Date(day.time * 1000);
                    let a = date.toString();
                    let b = a.split(" ");
                    let dayOfWeek = b[0];
                    return (
                        <div key={day.time} className="col-md-2">
                            <img src={image} />
                            <p>
                                {maxTemp}&deg;C / {minTemp}&deg;C
                            </p>
                            <p>{dayOfWeek}</p>
                            <p>{day.summary}</p>
                        </div>
                    );
                })}
            </div>
        );
        return <div>{forecastDaily}</div>;
    }
}

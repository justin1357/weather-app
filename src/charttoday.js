import React from "react";
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Area,
    Bar
} from "recharts";

export default class ChartToday extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tempClicked: true };
    }
    tempClick() {
        if (this.state.tempClicked) {
            this.setState({
                tempClicked: false
            });
        } else {
            this.setState({
                tempClicked: true,
                uvClicked: false,
                rainClicked: false
            });
        }
    }
    uvClick() {
        if (this.state.uvClicked) {
            this.setState({
                uvClicked: false
            });
        } else {
            this.setState({
                uvClicked: true,
                tempClicked: false,
                rainClicked: false
            });
        }
    }
    rainClick() {
        if (this.state.rainClicked) {
            this.setState({
                rainClicked: false
            });
        } else {
            this.setState({
                rainClicked: true,
                tempClicked: false,
                uvClicked: false
            });
        }
    }
    render() {
        console.log(this.state);
        let array = [];
        for (var i = 0; i < this.props.hourly.length; i++) {
            // console.log(this.props.hourly[i].time);
            let date = new Date(this.props.hourly[i].time * 1000);
            let a = date.toString();
            let b = a.split(" ");
            let time = b[4].slice(0, 5);
            console.log("time", time);
            let day = b[0];

            array.push({
                name: time,
                day: day,
                Temp: this.props.hourly[i].temperature,
                Uv: this.props.hourly[i].uvIndex,
                RainProbability: this.props.hourly[i].precipProbability
            });
        }
        let content;
        if (this.state.rainClicked) {
            content = <YAxis domain={[0, 1]} />;
        } else if (this.state.uvClicked) {
            content = <YAxis domain={[0, 11]} />;
        } else {
            content = <YAxis />;
        }
        return (
            <div className="chartToday container">
                <h3>This is a chart</h3>
                <button onClick={() => this.tempClick()}>Temp</button>
                <button onClick={() => this.uvClick()}>UV</button>
                <button onClick={() => this.rainClick()}>
                    Rain Probability
                </button>
                <p className="x" onClick={this.props.handleXClick}>
                    X
                </p>
                <ComposedChart width={1000} height={250} data={array}>
                    <XAxis dataKey="name" />
                    {content}
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    {this.state.rainClicked && (
                        <Area
                            type="monotone"
                            dataKey="RainProbability"
                            fill="#8884d8"
                            stroke="#8884d8"
                        />
                    )}
                    {this.state.tempClicked && (
                        <Bar dataKey="Temp" barSize={20} fill="#413ea0" />
                    )}
                    {this.state.uvClicked && (
                        <Line type="monotone" dataKey="Uv" stroke="#ff7300" />
                    )}
                </ComposedChart>
            </div>
        );
    }
}

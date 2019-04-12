import React from "react";
import axios from "./axios";
import Current from "./current";
import secrets from "./secrets.js";
import { connect } from "react-redux";
import { getForecast } from "./actions";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getForecast());
        const apiKey = secrets.apiKey;
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=berlin&APPID=${apiKey}&units=metric`
            )
            .then(data => {
                console.log("Current", data.data);
                this.setState({
                    result: data.data
                });
            })
            .catch(err => {
                console.log("err in api get", err);
            });
    }
    render() {
        return (
            <div>
                <Current weather={this.state.result} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(App);

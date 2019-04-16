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
        return <div />;
    }
}

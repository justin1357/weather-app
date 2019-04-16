import React from "react";
import axios from "./axios";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            inputsearch: ""
        };
    }
    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.value === "") {
            this.setState({ resVisible: false, results: null });
        } else {
            axios
                .post("/inc-search", { inputsearch: this.state.inputsearch })
                .then(data => {
                    this.setState({
                        results: data.data.predictions,
                        resVisible: true
                    });
                });
        }
    }
    mouseOver(e) {
        e.preventDefault();
        e.target.classList.add("hover");
    }
    mouseOut(e) {
        e.preventDefault();
        e.target.classList.remove("hover");
    }
    onClick(val) {
        this.setState({
            inputsearch: val.description,
            resVisible: false,
            results: null,
            data: val
        });
        console.log("Clicked", val);
    }
    componentDidUpdate() {}
    render() {
        let resultsArray = this.state.results;
        let results;

        if (resultsArray) {
            if (
                this.state.inputsearch != "" &&
                this.state.results.length == 0
            ) {
                results = <div className="results">No results</div>;
            } else {
                results = (
                    <div className="results">
                        {resultsArray.map(result => {
                            return (
                                <div
                                    key={result.id}
                                    onMouseOver={e => this.mouseOver(e)}
                                    onMouseOut={e => this.mouseOut(e)}
                                    onClick={() => this.onClick(result)}
                                >
                                    <p>{result.description}</p>
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">Weather-App</a>
                    <form className="form-inline" autoComplete="new-password">
                        <input
                            className="form-control mr-sm-2"
                            id="search"
                            autoComplete="off"
                            name="inputsearch"
                            type="search"
                            value={this.state.inputsearch}
                            placeholder="Search"
                            aria-label="Search"
                            ref={elem => (this.text = elem)}
                            onChange={e => this.onChange(e)}
                        />
                        {this.state.resVisible && <div>{results}</div>}
                        <button
                            onClick={e => {
                                e.preventDefault();
                                axios
                                    .post("/get-latandlong", {
                                        place_id: this.state.data.place_id
                                    })
                                    .then(data => {
                                        this.setState({
                                            lat:
                                                data.data.result.geometry
                                                    .location.lat,
                                            long:
                                                data.data.result.geometry
                                                    .location.lng
                                        });
                                    })
                                    .then(() => {
                                        this.props.getWeather(
                                            this.state.lat,
                                            this.state.long,
                                            this.state.data.description
                                        );
                                        this.setState({
                                            resVisible: false,
                                            inputsearch: ""
                                        });
                                    });
                            }}
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                        >
                            Go!!!
                        </button>
                    </form>
                </nav>
            </div>
        );
    }
}

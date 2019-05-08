import React, {Component} from 'react';
import './App.css';
import EnterKey from './EnterKey.js';

if (typeof window !== 'undefined') {
    window.React = React;
}

// Function to get the user's location
const getPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '',
            geolocation: {}
        };
        this.updateKey = this.updateKey.bind(this);
        this.getApi = this.getApi.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    updateKey(event) {
        this.setState({
            apiKey: event.target.value
        });
    }

    getApi(e) {
        console.log(this.state.geolocation.latitude);
        console.log(this.state.geolocation.longitude);
        const url = `https://www.n2yo.com/rest/v1/satellite/above/${this.state.geolocation.latitude}/${this.state.geolocation.longitude}/0/70/18/&apiKey=${this.state.apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
        e.preventDefault();
    }

    getLocation() {
        getPosition()
            .then((position) => {
                console.log(position);
                let location = {...this.state.geolocation};
                location.latitude = position.coords.latitude;
                location.longitude = position.coords.longitude;
                location.altitude = (position.coords.altitude) ? (position.coords.altitude) : 0;
                this.setState({geolocation: location}, () => {
                    console.log("Updated location state: ", this.state.geolocation)
                });
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    componentWillMount() {
        this.getLocation();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">Please enter an API key from
                    <a href="https://www.n2yo.com">https://www.n2yo.com</a>:
                </header>
                <EnterKey
                    input={this.state.apiKey}
                    handleChange={this.updateKey}
                    getApi={this.getApi}
                />
            </div>
        );
    }
}

export default App;

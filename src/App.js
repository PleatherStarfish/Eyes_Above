import React, {Component} from 'react';
import './App.css';
import SettingsCard from './SettingsCard.js';

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
            geolocation: {},
            getInput: true     // Overlay to get API key and settings from user.
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
                let location = {};
                location.latitude = position.coords.latitude;
                location.longitude = position.coords.longitude;
                location.altitude = (position.coords.altitude) ? (position.coords.altitude) : 0; //if no altitude use 0
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
        if (this.state.getInput) {
            return (
                <div className="App">
                    <div className="api-input-card"></div>
                    <h1 className="enter-api">Please enter an API key from
                        <a href="https://www.n2yo.com">https://www.n2yo.com</a>
                    </h1>
                    <SettingsCard
                        input={this.state.apiKey}
                        handleChange={this.updateKey}
                        getApi={this.getApi}
                    />
                </div>
            );
        }
    }
}

export default App;

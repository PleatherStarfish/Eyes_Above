/* global chrome */

import React, {Component} from 'react';
import './App.css';
import SettingsCard from './SettingsCard.js';
import Card from './Card.js';

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
            apiKey: '',            // User supplied API key
            satellites: [],        // Array returned by the API containing satellites in the sky
            degrees: 5,            // Degrees of the search radius in the sky above
            id: 'ANY',             // Types of satellites returned by the API
            interval: 60,          // Time interval in which the app rechecks its geolocation
            currentInterval: null, // Set to a "setInterval" callback function by the "update" method
            transactionscount: 0,  // Number of API transactions in the last hour
            getInput: true         // Overlay to get API key and settings from user.
        };
        this.updateKey = this.updateKey.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.closeCard = this.closeCard.bind(this);
        this.openCard = this.openCard.bind(this);
        this.fetchSatellites = this.fetchSatellites.bind(this);
        this.update = this.update.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
        this.updateDegrees = this.updateDegrees.bind(this);
        this.getApiOnKeySubmit = this.getApiOnKeySubmit.bind(this);
    }

    // Set state to value entered by the user
    updateKey(event) {
        this.setState({
            apiKey: event.target.value
        }, () => {
            chrome.storage.sync.set({'apiKey': this.state.apiKey})
        });
    }

    // Set how often the app refreshes itself
    updateInterval(event) {

        // Clear the current setInterval
        clearInterval(this.state.currentInterval);

        this.setState({
            interval: Number(event.target.value)
        }, () => {
            // console.log(this.state.interval);
            this.update();
        });
    }

    updateDegrees(event) {
        this.setState({
            degrees: Number(event.target.value)
        }, () => {
                // console.log(this.state.url);
                this.getLocation();
        });
    }

    // Set state to close the "settings" card
    closeCard() {
        this.setState({
            getInput: false
        })
    }

    // Set state to open the "settings" card
    openCard() {
        this.setState({
            getInput: true
        })
    }

    // Update is a callback that updates this.state.geolocation and calls the API at intervals
    update() {
        this.setState({currentInterval:
            setInterval(() => {
                this.getLocation()
            }, this.state.interval * 1000)
        })
    }

    fetchSatellites(geolocation) {
        const url = `https://www.n2yo.com/rest/v1/satellite/above/${geolocation.latitude}/${geolocation.longitude}/${geolocation.altitude}/${this.state.degrees}/${this.state.id}/&apiKey=${this.state.apiKey}`;
        console.log(url);
        if (this.state.transactionscount < 1000) {
            fetch(url)
                .then(response => response.json())
                .then((json) => {
                    console.log(json);
                    this.setState({
                        satellites: json.above,
                        transactionscount: json.info.transactionscount
                    });
                })
                .catch(err => console.log(err));
        } else {
            console.log("More than 1000 API requests in the last hour.")
        }
    }

    // method to handle key input from form field
    getApiOnKeySubmit(e) {
        this.getLocation();
        e.preventDefault();
    }

    // Get the user's geolocation
    getLocation(willFetch=true) {
        getPosition()
            .then((position) => {
                let location = {};
                location.latitude = position.coords.latitude;
                location.longitude = position.coords.longitude;
                location.altitude = (position.coords.altitude) ? (position.coords.altitude) : 0; //if no altitude use 0
                if (willFetch) {
                    this.fetchSatellites(location)  // Usually we want to go ahead and fetch satellites, but sometimes not
                }
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    // When the App component mounts, get the user's initial geolocation
    componentWillMount() {
        chrome.storage.sync.get(['apiKey'], (result) => {
            (result.apiKey) ? this.setState({apiKey: result.apiKey})
                     : (console.log("No API key in local storage. Please enter one."))
        });
    }

    componentDidMount() {
        this.update();
    }

    render() {

        console.log("OUTPUT");
        console.log(this.state.satellites);

        let overlay =
            <div>
                <SettingsCard
                    closeCard={this.closeCard}
                    keyInput={this.state.apiKey}
                    updateKeyState={this.updateKey}
                    fetchSatellites={this.getApiOnKeySubmit}
                    interval={this.state.interval}
                    updateInterval = {this.updateInterval}
                    degrees={this.state.degrees}
                    updateDegrees={this.updateDegrees}
                />
            </div>;

        let cardDeck =
            <div className="card-deck">
                <div id="open-settings" onClick={this.openCard}></div>
                <ul>
                    {(this.state.satellites)
                        ? this.state.satellites.map(item => <Card item={item} key={item.satid} />)
                        : console.log("No satellites found.")}
                </ul>
            </div>;

        return (
            <div>
                {this.state.getInput && overlay}
                {cardDeck}
            </div>
        )

    }
}

export default App;

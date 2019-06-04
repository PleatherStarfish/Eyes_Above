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
            degrees: 10,           // Degrees of the search radius in the sky above
            id: 'ANY',             // Types of satellites returned by the API
            interval: 15,          // Time interval in which the app rechecks its geolocation
            currentInterval: null, // Set to a "setInterval" callback function by the "update" method
            transactionscount: 0,  // Number of API transactions in the last hour
            getInput: true,        // Overlay to get API key and settings from user.
            audioMuted: false
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
        this.audioMutedToggle = this.audioMutedToggle.bind(this);
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
            chrome.storage.sync.set({'interval': this.state.interval})
        });
    }

    updateDegrees(event) {
        this.setState({
            degrees: Number(event.target.value)
        }, () => {
                // console.log(this.state.url);
                this.getLocation();
                chrome.storage.sync.set({'degrees': this.state.degrees})
        });
    }

    // Set state to close the "settings" card
    closeCard() {
        this.setState({
            getInput: false
        }, () => {
                chrome.storage.sync.set({'getInput': this.state.getInput})
            });
    }

    // Set state to open the "settings" card
    openCard() {
        this.setState({
            getInput: true
        }, () => {
                chrome.storage.sync.set({'getInput': this.state.getInput})
            });
    }

    // Update is a callback that updates this.state.geolocation and calls the API at intervals
    update() {
        this.setState({currentInterval:
            setInterval(() => {
                this.getLocation()
            }, this.state.interval * 1000)
        }, () => {
            chrome.storage.sync.set({'currentInterval': this.state.currentInterval})
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
                    let incomingSatsArray = json.above;
                    incomingSatsArray.sort((a, b) => parseFloat(a.satid) - parseFloat(b.satid)); // sort by satid
                    this.setState({
                        satellites: incomingSatsArray,
                        transactionscount: json.info.transactionscount
                    }, () => {
                            chrome.storage.sync.set({'satellites': this.state.satellites})
                        });
                })
                .catch(err => console.log(err));
        } else {
            console.log("More than 1000 API requests in the last hour.")
        }
        this.setState({getInput: false});
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

    audioMutedToggle() {
        this.setState(() => ({
            audioMuted: !this.state.audioMuted
        }));
    }

    // When the App component mounts, get the user's initial geolocation
    componentWillMount() {

        chrome.storage.sync.get(['satellites'], (result) => {
            (result.satellites) ? this.setState({satellites: result.satellites})
                : (console.log("No satellites in local storage. Please enter degrees."))
        });

        chrome.storage.sync.get(['apiKey'], (result) => {
            (result.apiKey) ? this.setState({apiKey: result.apiKey})
                     : (console.log("No API key in local storage. Please enter one."))
        });

        chrome.storage.sync.get(['degrees'], (result) => {
            (result.degrees) ? this.setState({degrees: result.degrees})
                : (console.log("No degrees in local storage. Please enter degrees."))
        });

        chrome.storage.sync.get(['getInput'], (result) => {
            (result.getInput != null) ? this.setState({getInput: result.getInput})
                : (console.log("No getInput in local storage."))
        });
    }

    componentDidMount() {
        this.update();
    }

    render() {

        const audio = (!this.state.audioMuted) ? 'audio' : 'audio-muted';

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
            <a className="card-deck">
                <div id="open-settings" onClick={this.openCard} />
                <div id={audio} onClick={this.audioMutedToggle} />
                <a href="https://github.com/PleatherStarfish/Eyes_Above" target="_blank" ><div id="open-info" /></a>
                <ul>
                    {(this.state.satellites)
                        ? this.state.satellites.map(satellite =>
                            <Card
                                satellite={satellite}
                                key={satellite.satid}
                                audioMuted={this.state.audioMuted}
                                getInput={this.state.getInput}
                            />)
                        : console.log("No satellites found.")}
                </ul>
            </a>;

        let warning = <div id="warning"><p>There are no satellites to display. Check that the API key is correct or try setting a
            larger search radius. If you recently changed the key, the app may take a few moments to update.</p></div>;

        return (
            <div>
                {this.state.getInput && overlay}
                {(this.state.satellites.length === 0) && warning}
                {cardDeck}
            </div>
        )

    }
}

export default App;

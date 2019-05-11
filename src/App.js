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
            satellites: [],
            searchRadius: 5,
            id: 'ANY',
            url: '',
            updateInterval: 60,
            getInput: true     // Overlay to get API key and settings from user.
        };
        this.updateKey = this.updateKey.bind(this);
        this.getApi = this.getApi.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.closeCard = this.closeCard.bind(this);
        this.openCard = this.openCard.bind(this);
        this.fetchApi = this.fetchApi.bind(this);
        this.update = this.update.bind(this);
    }

    // Set state to value entered by the user
    updateKey(event) {
        this.setState({
            apiKey: event.target.value
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

    update() {

        setInterval(() => {
            this.getLocation();

            this.setState({
                url: `https://www.n2yo.com/rest/v1/satellite/above/${this.state.geolocation.latitude}
                /${this.state.geolocation.longitude}/${this.state.geolocation.altitude}/${this.state.searchRadius}
                /${this.state.id}/&apiKey=${this.state.apiKey}`
            });

            this.fetchApi(this.state.url);
        }, 10000);
    }

    fetchApi(url) {
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                console.log(json.above);
                this.setState({
                    satellites: json.above
                })
            })
            .catch(err => console.log(err));
    }

    // Call the N2YO API using the user-entered key
    getApi(e) {
        this.setState({
            url: `https://www.n2yo.com/rest/v1/satellite/above/${this.state.geolocation.latitude}
            /${this.state.geolocation.longitude}/${this.state.geolocation.altitude}/${this.state.searchRadius}
            /${this.state.id}/&apiKey=${this.state.apiKey}`
        });

        this.fetchApi(this.state.url);

        e.preventDefault();
    }

    // Get the user's geolocation
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

    // When the App component mounts, get the user's initial geolocation
    componentWillMount() {
        this.getLocation();
    }

    componentDidMount() {
        this.update();
    }

    render() {
        if (this.state.getInput) {
            return (
                <div className="App">
                    <SettingsCard
                        closeCard={this.closeCard}
                        input={this.state.apiKey}
                        handleChange={this.updateKey}
                        getApi={this.getApi}
                        updateInterval={this.state.updateInterval}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <div id="open-settings" onClick={this.openCard}></div>
                </div>
            );
        }
    }
}

export default App;

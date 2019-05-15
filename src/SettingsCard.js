import React, {Component} from 'react';
import ApiKeyInput from './ApiKeyInput.js';
import UpdateInterval from './UpdateIntervalInput.js';
import DegreesInput from './DegreesInput.js';
import './App.css';

class SettingsCard extends Component {
    render() {
        return (
            <div className="api-input-card-container">
                <div className="api-input-card"></div>

                <div className="api-input-card-content">

                    <div id="close-settings" onClick={this.props.closeCard}></div>

                    <h1 id="enter-api-heading">Please enter an API key from</h1>
                    <h1 id="enter-api-heading-link"><a href="https://www.n2yo.com">N2YO.com</a></h1>

                    <ApiKeyInput
                        fetchSatellites={this.props.fetchSatellites}
                        keyInput={this.props.keyInput}
                        updateKeyState={this.props.updateKeyState}
                    />

                    <UpdateInterval
                        interval={this.props.interval}
                        updateInterval={this.props.updateInterval}
                    />

                    <DegreesInput
                        degrees={this.props.degrees}
                        updateDegrees={this.props.updateDegrees}
                    />

                    <p id="instructions" style={{marginTop:'44px'}}>Eyes Above v0.0.0.1</p>
                    <p id="license">Licensed under </p><p style={{top: '494px', left: '108px', width: '100px'}}><a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a></p>

                </div>

            </div>
        );
    }
}

export default SettingsCard;
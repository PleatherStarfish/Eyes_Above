import React, {Component} from 'react';
import ApiKeyInput from './ApiKeyInput.js';
import UpdateInterval from './UpdateIntervalInput.js';
import DegreesInput from './DegreesInput.js';
import './App.css';

class SettingsCard extends Component {
    render() {
        return (
            <div>
                <div className="api-input-card"></div>

                <div className="api-input-card-content">

                    <div id="close-settings" onClick={this.props.closeCard}></div>

                    <h1 className="enter-api-heading">Please enter an API key from
                        <a href="https://www.n2yo.com">N2YO.com</a>
                    </h1>

                    <ApiKeyInput
                        getApi={this.props.getApi}
                        input={this.props.input}
                        handleChange={this.props.handleChange}
                    />

                    <UpdateInterval
                        interval={this.props.interval}
                        updateInterval={this.props.updateInterval}
                    />

                    <DegreesInput
                        degrees={this.props.degrees}
                        updateDegrees={this.props.updateDegrees}
                    />

                    <p style={{marginTop:'30px'}}>Eyes Above 0.1.0</p>
                    <p style={{marginTop:'0px'}}>Licensed under <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a></p>

                </div>

            </div>
        );
    }
}

export default SettingsCard;
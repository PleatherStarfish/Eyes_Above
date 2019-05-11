import React, {Component} from 'react';
import ApiKeyInput from './ApiKeyInput.js';
import './App.css';

class SettingsCard extends Component {
    render() {
        return (
            <div className="api-input-card">
                <div id="close-settings" onClick={this.props.closeCard}></div>
                <h1 className="enter-api-heading">Please enter an API key from
                    <a href="https://www.n2yo.com">https://www.n2yo.com</a>
                </h1>
                <ApiKeyInput
                    getApi={this.props.getApi}
                    input={this.props.input}
                    handleChange={this.props.handleChange}
                />
            </div>
        );
    }
}

export default SettingsCard;
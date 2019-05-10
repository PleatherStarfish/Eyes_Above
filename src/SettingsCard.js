import React, {Component} from 'react';
import './App.css';

class SettingsCard extends Component {
    render() {
        return (
            <form onSubmit={this.props.getApi}>
                <input className="api-input"
                       type="text"
                       name="apikeyin"
                       value={this.props.input}
                       onChange={this.props.handleChange}
                />
                <input className="api-submit"
                       type="submit"
                       value="Submit"
                />
            </form>
        );
    }
}

export default SettingsCard;
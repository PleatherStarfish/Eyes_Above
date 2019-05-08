import React, {Component} from 'react';
import './App.css';

class EnterKey extends Component {
    render() {
        return (
            <div className="Input">
                <form onSubmit={this.props.getApi}>
                    <input type="text" value={this.props.input} onChange={this.props.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default EnterKey;
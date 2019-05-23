import React, {Component} from 'react';
import satellites from "./data";
import Audio from "./Audio";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {audioOn: false};
        this.toggleAudio = this.toggleAudio.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.key !== nextProps.key) {
            return true;
        }
        if (this.state.audioOn !== nextState.audioOn) {
            return true;
        }
        return false;
    }

    // turn audio on/off
    toggleAudio() {
        this.setState(() => ({
            audioOn: !this.state.audioOn
        }));
    }

    render() {
        let utc = new Date(`${this.props.item.launchDate}`).toUTCString().split(' ').slice(0, 4).join(' ');
        const speakerClicked = (this.state.audioOn) ? 'toggle-audio-clicked' : 'toggle-audio';
        return (
            <li key={this.props.key} className="card">
                <div className="card-contents">
                    <div className="card-contents-left">
                        <h2>{this.props.item.satname}</h2>
                        <p style={{paddingTop: "2px", marginTop: 0}}>NORAD ID: {this.props.item.satid}</p>
                    </div>
                    <div className="card-contents-right">
                        <p style={{paddingTop: "20px", marginTop: 0}}>LAUNCH DATE: {utc}</p>
                        <p style={{paddingTop: "5px", marginTop: 0}}>ALTITUDE: {this.props.item.satalt} km</p>

                        {/*{audio toggle icon}*/}
                        <div
                            id={speakerClicked}
                            onClick={this.toggleAudio}>

                        </div>

                        {/*{the tone.js audio synthesizer itself}*/}
                        <Audio satid={this.props.item.satid} toggleAudio={this.state.audioOn} />

                    </div>
                </div>
            </li>
        );
    }
}

export default Card;
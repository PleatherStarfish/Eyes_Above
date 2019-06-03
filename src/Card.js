import React, {Component} from 'react';
import Data from './sat_data.json'
import Audio from "./Audio";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioOn: false,
            slideOutOpen: false
        };
        this.toggleAudio = this.toggleAudio.bind(this);
        this.toggleSlideOut = this.toggleSlideOut.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.key !== nextProps.key) ||            // Returns true if any is true, else false
               (this.state.audioOn !== nextState.audioOn) ||
               (this.props.audioMuted !== nextProps.audioMuted) ||
               (this.state.slideOutOpen !== nextState.slideOutOpen);
    }

    // turn audio on/off
    toggleAudio() {
        // Only allow toggle if unmuted
        if (!this.props.audioMuted) {
            this.setState(() => ({
                audioOn: !this.state.audioOn
            }));
        }
    }

    // slide in/out panel with satellite info
    toggleSlideOut() {
        this.setState(() => ({
            slideOutOpen: !this.state.slideOutOpen
        }));
    }

    render() {

        let utc = new Date(`${this.props.satellite.launchDate}`).toUTCString().split(' ').slice(0, 4).join(' ');
        utc = utc.toLocaleString();

        const speakerClicked = (this.state.audioOn && !this.props.audioMuted) ? 'toggle-audio-clicked' : 'toggle-audio';

        if (this.props.audioMuted) {
            this.setState({audioOn: false});
        }

        const id = this.props.satellite.satid;

        // let alt = this.props.satellite.satalt;
        // let alt_unit = "km";
        //
        // if (alt < 1000000) {
        //     alt = alt.toLocaleString();
        // }
        // else if (alt < 1000000000) {
        //     alt = alt / 1000000;
        //     alt = alt.toLocaleString();
        //     alt_unit = "gm"
        // } else {
        //     alt = alt / 1000000000;
        //     alt = alt.toLocaleString();
        //     alt_unit = "tm"
        // }

        return (
            <li key={this.props.key} >
                <div className="card">
                    <div className="card-contents">
                        <div className="card-contents-left">

                            <h2>{this.props.satellite.satname}</h2>

                        </div>
                        <div className="card-contents-right">

                            <p style={{paddingTop: "20px", marginTop: 0}}>
                                <b>NORAD ID:</b> {this.props.satellite.satid}
                            </p>

                            <p style={{paddingTop: "5px", marginTop: 0}}>
                                <b>LAUNCH DATE:</b> {utc}
                            </p>

                            {/*<p style={{paddingTop: "5px", marginTop: 0}}>*/}
                            {/*    <b>ALTITUDE:</b> {alt} {alt_unit}*/}
                            {/*</p>*/}

                            {/*{the tone.js audio synthesizer itself}*/}
                            <Audio satid={this.props.satellite.satid} toggleAudio={this.state.audioOn} />

                        </div>
                    </div>

                    <div className="card-footer">

                        <div className="slide-out-arrow">

                            <div></div>

                            {(this.state.slideOutOpen) ?
                                <div className="arrow-up" onClick={this.toggleSlideOut}>&#xFE3D;</div> :
                                <div className="arrow-down" onClick={this.toggleSlideOut}>&#xFE3E;</div>
                            }

                            {/*{audio toggle icon}*/}
                            <div
                                id={speakerClicked}
                                onClick={this.toggleAudio}>
                            </div>

                        </div>

                    </div>
                </div>

                {(this.state.slideOutOpen) ?

                    <div className="slide-out-open">

                        <div className="slide-out-open-left">

                            {(Data[id].source) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>NATIONALITY:</b> {Data[id].source}
                                </p>
                                :
                                null
                            }

                            {(Data[id].launch_site) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>LAUNCH SITE:</b> {Data[id].launch_site}</p>
                                :
                                null
                            }

                            {(Data[id].period) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>PERIOD:</b> {Data[id].period}</p>
                                :
                                null
                            }

                        </div>

                        <div className="slide-out-open-right">

                            {(Data[id].inclination) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>INCLINATION:</b> {Data[id].inclination} &#176;</p>
                                :
                                null
                            }

                            {(Data[id].semi_major_axis) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>SEMIMAJOR AXIS:</b> {Data[id].semi_major_axis} km</p>
                                :
                                null
                            }

                            {(Data[id].perigee) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>PARIGEE:</b> {Data[id].perigee} km</p>
                                :
                                null
                            }

                            {(Data[id].apogee) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>APOGEE:</b> {Data[id].apogee} km</p>
                                :
                                null
                            }

                        </div>

                    </div>
                    :
                    <div className="slide-out-closed"></div>
                }
            </li>
        );
    }
}

export default Card;
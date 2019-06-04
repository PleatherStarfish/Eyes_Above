import React, {Component} from 'react';
import Data from './sat_data.json'
import Audio from './Audio';

const iso3311a2 = require('./../node_modules/iso-3166-1-alpha-2');

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
               (this.state.slideOutOpen !== nextState.slideOutOpen) ||
               (this.props.getInput !== nextState.getInput);
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

        let flag = null;
        let country = null;

        if (Data[id] && Data[id].source && !this.props.getInput) {

            console.log(this.props.satellite.satalt);
            console.log(Data[id].source);
            console.log(Data[id].source.replace(/ *\([^)]*\) */g, "").trim());

            country = Data[id].source.replace(/ *\([^)]*\) */g, "");
            country = country.trim();
            if (country === "People's Republic of China") {
                country = "China";
            }
            if (country === "Commonwealth of Independent States") {
                country = "Russian Federation";
            }
            if (country === "Iran") {
                country = "The Islamic Republic of Iran";
            }

            let country_code = iso3311a2.getCode(country);

            if (country_code) {
                country_code = country_code.toLowerCase();
                flag = `flag-icon flag-icon-${country_code}`;
            }

            console.log("Country: ", country, ", Country_code: ", country_code, ", Flag: ", flag);
        }

        return (
            <li key={this.props.key} >
                <div className="card">
                    <div className="card-contents">
                        <div className="card-contents-left">

                            <h2>{this.props.satellite.satname}</h2>

                            {(flag) ?
                                <span className={flag}></span> :
                                (Data[id] && Data[id].source) && <span style={{marginLeft: '22px'}}>
                                    <b>{country}</b>
                                </span>
                            }

                        </div>
                        <div className="card-contents-right">

                            <p style={{paddingTop: "20px", marginTop: 0}}>
                                <b>NORAD ID:</b> {this.props.satellite.satid}
                            </p>

                            <p style={{paddingTop: "5px", marginTop: 0}}>
                                <b>LAUNCH DATE:</b> {utc}
                            </p>

                            {/*{the tone.js audio synthesizer itself}*/}
                            <Audio
                                satid={this.props.satellite.satid}
                                toggleAudio={this.state.audioOn}
                                data={(Data[id]) ? Data[id] : null}
                                alt={this.props.satellite.satalt}
                            />

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

                            {(Data[id] && Data[id].source) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>NATIONALITY:</b> {Data[id].source}
                                </p>
                                :
                                null
                            }

                            {(Data[id] && Data[id].launch_site) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>LAUNCH SITE:</b> {Data[id].launch_site}</p>
                                :
                                null
                            }

                        </div>

                        <div className="slide-out-open-right">

                            {(Data[id] && Data[id].period) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>PERIOD:</b> {Data[id].period}</p>
                                :
                                null
                            }

                            {(Data[id] && Data[id].inclination) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>INCLINATION:</b> {Data[id].inclination} &#176;</p>
                                :
                                null
                            }

                            {(Data[id] && Data[id].semi_major_axis) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>SEMIMAJOR AXIS:</b> {Data[id].semi_major_axis} km</p>
                                :
                                null
                            }

                            {(Data[id] && Data[id].perigee) ?
                                <p style={{paddingTop: "5px", marginTop: 0}}>
                                    <b>PARIGEE:</b> {Data[id].perigee} km</p>
                                :
                                null
                            }

                            {(Data[id] && Data[id].apogee) ?
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
import React, {Component} from 'react';
import satellites from "./data";
import Audio from "./Audio";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {audioOn: false};
    }

    render() {
        let utc = new Date(`${this.props.item.launchDate}`).toUTCString().split(' ').slice(0, 4).join(' ');
        return (
            <li key={this.props.key} className="card">
                <div className="cardContents">
                    <div>
                        <h2>{this.props.item.satname}</h2>
                        <p style={{paddingTop: "2px", marginTop: 0}}>NORAD ID: {this.props.item.satid}</p>
                    </div>
                    <div>
                        <p style={{paddingTop: "20px", marginTop: 0}}>LAUNCH DATE: {utc}</p>
                        <p style={{paddingTop: "5px", marginTop: 0}}>ALTITUDE: {this.props.item.satalt} km</p>
                        <Audio number={this.props.item.satid} />
                    </div>
                </div>
            </li>
        );
    }
}

export default Card;
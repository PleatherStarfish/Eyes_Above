import React, {Component} from 'react';
import satellites from "./data";

function Card(props) {
    let utc = new Date(`${props.item.launchDate}`).toUTCString().split(' ').slice(0, 4).join(' ');;
    return (
        <li key={props.key} className="card">
            <div className="cardContents">
                <div>
                    <h2>{props.item.satname}</h2>
                    <p style={{paddingTop: "2px", marginTop: 0}}>NORAD ID: {props.item.satid}</p>
                </div>
                <div>
                    <p style={{paddingTop: "20px", marginTop: 0}}>LAUNCH DATE: {utc}</p>
                    <p style={{paddingTop: "5px", marginTop: 0}}>ALTITUDE: {props.item.satalt} km</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
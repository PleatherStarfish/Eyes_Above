import React, {Component} from 'react';
import satellites from "./data";

function Card(props) {
    return (
        <li key={props.key} className="card">
            <div>
                <h2>{props.item.satname}</h2>
                <p>NORAD ID: {props.item.satid}</p>
                <p>{(satellites[`${props.item.satid}`]) ? satellites[`${props.item.satid}`].name : <span></span>}</p>
            </div>
        </li>
    );
}

export default Card;
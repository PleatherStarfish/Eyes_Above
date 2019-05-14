import React, {Component} from 'react';

function Card(props) {
    return (
        <li key={props.key} style={{
            backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}>
            {props.item.satname}
        </li>
    );
}

export default Card;
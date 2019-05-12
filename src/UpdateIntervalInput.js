import React, {Component} from 'react';

function UpdateInterval(props) {
    return (
        <div>
            <h2 className="update-interval-heading">Update time interval (in minutes):</h2>
            <select id="myInterval" value={props.interval} onChange={props.updateInterval}>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="60">60</option>
            </select>
        </div>
    )
}

export default UpdateInterval;
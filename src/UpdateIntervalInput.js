import React, {Component} from 'react';

function UpdateInterval(props) {
    return (
        <div className="update-interval">
            <h2 id="update-interval-heading">Update time interval (in minutes):</h2>

            <p id="caution">Caution: The N2YO API is currently limited to 1000 transactions per hour.</p>

            <select id="interval" value={props.interval} onChange={props.updateInterval}>
                <option value="1">1 min.</option>
                <option value="5">5 min.</option>
                <option value="15">15 min.</option>
                <option value="30">30 min.</option>
                <option value="60">1 hr.</option>
                <option value="120">2 hr.</option>
            </select>
        </div>
    )
}

export default UpdateInterval;
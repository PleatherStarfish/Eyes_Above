import React, {Component} from 'react';

function DegreeInput(props) {
    return (
        <div>
            <h2 id="update-degree-heading">Search radius in the sky above (in degrees):</h2>

            <select id="degrees" value={props.degrees} onChange={props.updateDegrees}>
                <option value="1">1 degree</option>
                <option value="2">2 degrees</option>
                <option value="3">3 degrees</option>
                <option value="4">4 degrees</option>
                <option value="5">5 degrees</option>
                <option value="6">6 degrees</option>
                <option value="7">7 degrees</option>
                <option value="8">8 degrees</option>
                <option value="9">9 degrees</option>
                <option value="10">10 degrees</option>
                <option value="15">15 degrees</option>
                <option value="20">20 degrees</option>
                <option value="25">25 degrees</option>
                <option value="30">30 degrees</option>
            </select>
        </div>
    )
}

export default DegreeInput;
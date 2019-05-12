import React, {Component} from 'react';

function DegreeInput(props) {
    return (
        <div>
            <h2 className="update-degree-heading">Search radius in the sky above (in degrees):</h2>

            <p>Caution: The N2YO API is currently limited to 1000 transactions/hour. Your sky likely
            contains hundreds or even thousands of satellites at any given time. It is recommended to start
            with a search radius of 1-10 degrees and expand that only cautiously.</p>

            <select id="myDegrees" value={props.degrees} onChange={props.updateDegrees}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
            </select>
        </div>
    )
}

export default DegreeInput;
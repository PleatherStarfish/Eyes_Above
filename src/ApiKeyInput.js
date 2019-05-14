import React, {Component} from 'react';

function ApiKeyInput(props) {
    return (
        <form onSubmit={props.fetchSatellites}>
            <input className="api-input"
                   type="text"
                   name="apikeyin"
                   value={props.keyInput}
                   onChange={props.updateKeyState}
                   placeholder="######-######-######-####"
            />
            <input className="api-submit"
                   type="submit"
                   value="Submit"
            />
        </form>
    )
}

export default ApiKeyInput;
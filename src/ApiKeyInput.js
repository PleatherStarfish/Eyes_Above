import React, {Component} from 'react';

function ApiKeyInput(props) {
    return (
        <form onSubmit={props.getApi}>
            <input className="api-input"
                   type="text"
                   name="apikeyin"
                   value={props.input}
                   onChange={props.handleChange}
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
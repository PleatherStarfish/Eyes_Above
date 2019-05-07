import React, {Component} from 'react';
import './App.css';

if (typeof window !== 'undefined') {
    window.React = React;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: ''
        };
        this.updateKey = this.updateKey.bind(this);
        this.getApi = this.getApi.bind(this);
    }

    updateKey(event) {
        this.setState({
            apiKey: event.target.value
        });
    }

    getApi(e) {
        const url = `https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=${this.state.apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
        e.preventDefault();
    }

    render() {
        console.log("TEST")
        let output = null;
        if (this.state.apiKey) {
            output = <RenderInput input={this.state.apiKey} />
        }
        return (
            <div className="App">
                <header className="App-header">Eyes Above</header>
                <EnterKey input={this.state.apiKey} handleChange={this.updateKey} getApi={this.getApi} />
                {output}
            </div>
        );
    }
}

class EnterKey extends Component {
    render() {
        return (
            <div className="Input">
                <form onSubmit={this.props.getApi}>
                    <input type="text" value={this.props.input} onChange={this.props.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

class RenderInput extends React.Component {
    render() {
        return (
            <div>
                <p>Key Entered: {this.props.input}</p>
            </div>
        );
    }
}

export default App;

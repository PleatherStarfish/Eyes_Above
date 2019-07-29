import React, {Component} from 'react';
import autoBind from "react-autobind";

// Use React's new Context API for a few global state values.
// -----------------------------------------
const AudioContext = React.createContext();

class AudioProvider extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            audioMuted: false
        }
    }
    audioMutedToggle() {
        this.setState(() => ({
            audioMuted: !this.state.audioMuted
        }));
    }
    render() {
        return (
            <AudioContext.Provider value={{
                state: this.state,
                audioMutedToggle: this.audioMutedToggle
            }}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}
// -----------------------------------------
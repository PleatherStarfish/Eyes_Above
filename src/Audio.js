import React, {Component} from 'react';
import Tone from 'Tone';

class Audio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pwm: null,
            lfo1: null,
            lfo2: null,
            pitch: (Math.random() * 15000) + 40
        }
    }

    // We don't want the audio component to update whenever state
    // changes in the parent branch, only when it gets new props

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.satid !== nextProps.satid) {
            return true;
        }
        if (this.props.toggleAudio !== nextProps.toggleAudio) {
            return true;
        }
        return false;
    }

    componentWillMount() {

        const attack = (Math.random() * 6) + 1;

        const synthOptions = {
            harmonicity  : 3 ,
            modulationIndex  : 10 ,
            detune  : 0 ,
            oscillator  : {
                type  : 'triangle'
            }  ,
            envelope  : {
                attack  : attack ,
                decay  : 0 ,
                sustain  : 1 ,
                release  : 0.5
            }  ,
            modulation  : {
                type  : 'sine'
            }  ,
            modulationEnvelope  : {
                attack  : attack ,
                decay  : 0 ,
                sustain  : 1 ,
                release  : 0.5
            }
        };

        const phase1 = Math.random();
        const lfoOneOptions = {
            type  : 'sine' ,
            min  : 1 ,
            max  : 9 ,
            phase  : phase1 ,
            frequency  : 0.1 ,
            amplitude  : 1 ,
            units  : Tone.Type.Default
        };

        const phase2 = Math.random();
        const lfoTwoOptions = {
            type  : 'sine' ,
            min  : 2 ,
            max  : 10 ,
            phase  : phase2 ,
            frequency  : 0.2 ,
            amplitude  : 1 ,
            units  : Tone.Type.Default
        };

        // Set state for the FM Synth -> LFOs -> connected the two
        const synth = new Tone.FMSynth(synthOptions).toMaster();
        this.setState({pwm: synth}, () => {
            const lfoOne = new Tone.LFO(lfoOneOptions);
            this.setState({lfo1: lfoOne}, () => {
                const lfoTwo = new Tone.LFO(lfoTwoOptions);
                this.setState({lfo2: lfoTwo}, () => {
                    this.state.lfo1.connect(this.state.pwm.harmonicity).start();
                    this.state.lfo2.connect(this.state.pwm.modulationIndex).start();
                });
            });
        });
    }

    componentDidMount() {
        // By default audio does NOT start when component mounts, but it's an option
        if (this.props.toggleAudio) {
            this.state.pwm.triggerAttack(this.state.pitch);
        }
    }

    componentWillUnmount() {
        // If audio IS playing, turn it off when the component unmounts
        if (this.props.toggleAudio) {
            this.state.pwm.triggerRelease();
        }
    }

    render() {

        console.log(this.props.toggleAudio);

        if (this.props.toggleAudio) {
            this.state.pwm.triggerAttack(this.state.pitch);
        } else {
            this.state.pwm.triggerRelease();
        }

        return (
            null
        )
    };

}

export default Audio;

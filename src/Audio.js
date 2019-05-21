import React, {Component} from 'react';
import Tone from 'Tone';

class Audio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            audioOn: false,
            pwm: null,
            lfo1: null,
            lfo2: null
        }
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
        const pitch = (Math.random() * 15000) + 40;
        console.log(`Pitch: ${pitch}`);
        this.state.pwm.triggerAttack(pitch);
    }

    componentWillUnmount() {
        this.state.pwm.triggerRelease();
    }

    render() {

        return (
            null
        )
    };

}

export default Audio;

import React, {Component} from 'react';
import autoBind from 'react-autobind';
import Tone from 'Tone';

class Audio extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            pwm: null,
            lfo1: null,
            trem: null,
            pitch: 1
        };
    }

    mapToNewRange({num, in_min=180, in_max=35786, out_min=30, out_max=12000, linear=true}) {
        if (num > in_max) {
            num = in_max;
        }
        if (num < in_min) {
            num = in_min;
        }
        const linearValue = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

        const logValue = Math.pow(10, Math.floor(Math.log(linearValue) / Math.log(10)));

        return (linear) ? linearValue : logValue;
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
        if (this.props.data !== nextProps.data) {
            return true;
        }
        return false;
    }

    componentWillMount() {

        this.setState({pitch: this.mapToNewRange({num: this.props.alt, linear: false})});

        // random attack time in seconds
        const attack = (Math.random() * 6) + 1;

        const synthOptions = {
            harmonicity  : 1 ,
            modulationIndex  : 1 ,
            detune  : 0 ,
            oscillator  : {
                type  : 'square'
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

        // LFO1 controls FM synth's harmonicity

        const perigee = (this.props.data && Number.isInteger(this.props.data.perigee)) ?
            this.mapToNewRange({num: this.props.data.perigee, out_min: 1.1, out_max: 1.5}) : 1.1;

        const apogee = (this.props.data && Number.isInteger(this.props.data.apogee)) ?
            this.mapToNewRange({num: this.props.data.apogee, out_min: 1.1, out_max: 3.5}) : 2;

        // LFO2 controls FM synth's modulationIndex
        const period = (this.props.data && Number.isInteger(this.props.data.period)) ?
            this.mapToNewRange({num: this.props.data.period, in_min: 60, in_max: 10080, out_min: 0.1, out_max: 20}) : 1;

        const phase1 = Math.random();

        const lfoOneOptions = {
            type  : 'sine' ,
            min  : perigee,
            max  : apogee,
            phase  : phase1 ,
            frequency  : period ,
            amplitude  : 1 ,
            units  : Tone.Type.Default
        };

        const phase2 = Math.random();

        const tremOptions = {
            frequency  : period ,
            type  : 'sine' ,
            depth  : 0.7 ,
            spread  : 180
        };

        console.log(period, " | ", perigee, " | ", perigee);

        // then define a new tremolo and put this on the state
        const trem = new Tone.Tremolo ( tremOptions );

        const dist = new Tone.Distortion({distortion  : 0.4 , oversample  : '2x'});

        // Set state for the FM Synth -> LFOs -> connected the two
        const synth = new Tone.FMSynth( synthOptions ).chain(trem, dist, Tone.Master);

        // Put FM synth on the state
        this.setState({pwm: synth}, () => {

            // then define a new LFO and put this on the state
            const lfoOne = new Tone.LFO( lfoOneOptions );
            this.setState({lfo1: lfoOne}, () => {

                // then define a new tremolo and put this on the state
                this.setState({trem: trem}, () => {

                    // then connect LFO and tremolo to FM synth
                    this.state.lfo1.connect(this.state.pwm.harmonicity).start();
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

        console.log("Pitch: ", this.state.pitch);

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

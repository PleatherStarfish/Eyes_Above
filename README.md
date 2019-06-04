<img style="float: center;" src="https://user-images.githubusercontent.com/10040486/58818124-558b7880-85fb-11e9-8af1-d5fb0a9ae7bf.png" width="290" height="435"> <img style="float: center;" src="https://user-images.githubusercontent.com/10040486/58818139-5d4b1d00-85fb-11e9-96e7-569d441a5cee.png" width="290" height="435"> <img style="float: center;" src="https://user-images.githubusercontent.com/10040486/58818148-63d99480-85fb-11e9-9185-78ca750d7185.png" width="290" height="435">

<br/>
A Chrome browser extension built in React.js for visualizing and sonifying satellites overhead in realtime. The app 
requires the user to enter an API key 
from https://www.n2yo.com. Audio sonification of data uses Web Audio API via [Tone.js](https://tonejs.github.io/).

## How to Enter the API Key

Eyes Above requires to user to enter their own API key from n2yo.com. To do this, create a free account, navigate to 
your user page, and copy the 22 digit key shown at the bottem of the page.
<br/>
<img style="float: center;" src="https://user-images.githubusercontent.com/10040486/58820462-afdb0800-8600-11e9-9c1f-01fa1f990f52.jpg"  width="521" height="384">

In the Settings page in the Eyes Above page, paste the API key into the input field and click "Submit."

## Data

Eyes Above uses the n2yo API to get a list of NORAD IDs for satellites in a user-selected radius above the user. The 
app then cross-checks this ID with a database of satellites in orbit around the earth. 
The app currently supports the following data, if available:

* norad id
* name
* nationality of origin 
* launch date
* launch site
* period
* inclination
* semi-major axis
* parigee
* apogee

## Sonification

The audio sonification uses FM (frequency modulation) synthesis and LFOs (low frequency oscillators) to map each 
individual satellite's data to an acoustic tone. The data mappings currently supported are as follows.

* period <b>--></b> the frequency of an LFO driving the carrier tone's amplitude
* inclination <b>--></b> left-right panning
* parigee <b>--></b> harmonicity of modulator tone (closest frequency to carrier)
* apogee <b>--></b> the amplitude of an LFO driving the modulator tone's frequency

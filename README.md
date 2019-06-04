<img src="https://user-images.githubusercontent.com/10040486/58903048-7541a000-86d2-11e9-92f7-057480db1bde.png">
<br/><br/>

Eyes Above is a Chrome browser extension built in React.js for visualizing and sonifying satellites overhead in realtime. The app 
requires the user to enter an API key 
from https://www.n2yo.com. Audio sonification of data uses Web Audio API via [Tone.js](https://tonejs.github.io/).

The Eyes Above browser extension can be found on the Chrome Web Store here: https://chrome.google.com/webstore/detail/eyes-above/goeipoopgdbebjoikkjihfjahogjbnda

<img style="float: center;" src="https://user-images.githubusercontent.com/10040486/58818124-558b7880-85fb-11e9-8af1-d5fb0a9ae7bf.png" width="288" height="435"><img style="float: center;" src="https://user-images.githubusercontent.com/10040486/58891006-b8434980-86b9-11e9-8974-7827932b0974.png" width="288" height="435"><img style="float: center;" src="https://user-images.githubusercontent.com/10040486/58891072-ddd05300-86b9-11e9-8941-a2b23660a109.png" width="288" height="435">

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

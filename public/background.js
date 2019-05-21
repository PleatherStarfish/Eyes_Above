/* global chrome */

let chromeSatellites = [];

setInterval(() => {
    console.log(chromeSatellites);

    chrome.storage.sync.get(['satellites'], (result) => {
        (result.satellites) ? chromeSatellites = result.satellites
            : (console.log("No satellites in local storage. Please enter degrees."))
    });

    messageReceived(chromeSatellites);
}, 5000);

function messageReceived(chromeSatellites) {
    chrome.notifications.create("nid", {
        title: 'Satellites',
        iconUrl: 'bridge.png',
        type: 'basic',
        message: "chromeSatellites"
    }, function(){});
}
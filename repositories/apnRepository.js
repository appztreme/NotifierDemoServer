'use strict';
const apn = require('apn');

const options = { };
const apnConnection = new apn.Connection(options);

exports sendIosNotification = function(deviceToken, sender, message) {
    let device = new apn.Device(token);
    let note = new apn.Notification();
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 " + message;
    note.payload = {'messageFrom': sender};

    apnConnection.pushNotification(note, myDevice);
}

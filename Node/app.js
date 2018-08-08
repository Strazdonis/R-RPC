const pidusage = require('pidusage');
const find = require('find-process');
const client = require('discord-rich-presence')('475313648500211739');
var WebSocket = require("WS");
var reconnect;
var BreakException = {};

var fs = require('fs');
if (!fs.existsSync(process.env.HOME + "\\AppData\\Roaming\\Rainmeter\\Plugins\\MessagePassing.dll") || !fs.existsSync(process.env.HOME + "\\AppData\\Roaming\\Rainmeter\\Plugins\\messagepassing.dll")) {
  console.log("missing MessagePassing.dll");
}

function open() {
    try {
        var url = "ws://127.0.0.1:58932/r-rpc";
        ws = new WebSocket(url);
        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onmessage = onMessage;
        ws.onerror = onError;
        console.log("Opening websocket");
    } catch (error) {
        console.log("Error:" + error);
    }
}
var onOpen = function() {
    console.log("Opened websocket");
    connected = true;
    clearTimeout(reconnect);
};
var onClose = function() {
    console.log("Closed websocket");
    connected = false;
    reconnect = setTimeout(function() {
        open();
    }, 5000);
};
var onMessage = function(event) {
  var res = event.data.split(" ");
  client.updatePresence({
    state:  Math.round(res[0] * 10) / 10 + '% CPU usage',
    details: res[1] + ' skins loaded',
    largeImageKey: 'rainmeter',
    largeImageText: 'Desktop customization tool'
  });
};
var onError = function(event) {
    if (typeof event.data != 'undefined') {
        console.log("Websocket Error:" + event.data);
    }
};
function sendMessage(stringToSend) {
    if (connected) {
        ws.send(stringToSend);
    }
}
open();

/* jshint esversion: 11 */
(async () => {
  const WebSocket = require("WS");
  const fs = require('fs');

  const client = require('discord-rich-presence')(await getClientID());

  let reconnect;
  let updated = false;

  if (!fs.existsSync(process.env.APPDATA + "\\Rainmeter\\Plugins\\MessagePassing.dll") || !fs.existsSync(process.env.APPDATA + "\\Rainmeter\\Plugins\\messagepassing.dll")) {
    console.log("missing MessagePassing.dll (looked for " + process.env.APPDATA + "\\Rainmeter\\Plugins\\MessagePassing.dll OR " + process.env.APPDATA + "\\Rainmeter\\Plugins\\messagepassing.dll)");
  }

  async function getClientID() {
    const data = await fs.promises.readFile("client_id.txt", "utf-8");
    const parsed = JSON.parse(data);
    console.log("Specified client ID: " + parsed);
    return parsed;
  }

  function humanFileSize(bytes, si) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  function open() {
    try {
      const url = "ws://127.0.0.1:58932/r-rpc";
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
  const onOpen = function () {
    console.log("Opened websocket");
    connected = true;
    clearTimeout(reconnect);
  };
  const onClose = function () {
    console.log("Closed websocket");
    connected = false;
    reconnect = setTimeout(function () {
      open();
    }, 5000);
  };
  const onMessage = function (event) {
    const field = event.data.split("`∟↔▲▼☺`");
    console.log(field);
    if (!updated) {
      // if elapsed time option is enabled
      if (field[2]) {
        updated = true;
        elapsed = (Date.now() / 1000 | 0);
      } else {
        elapsed = null;
      }
    }
    image = "rainmeter" + field[3];
    console.log(image);
    client.updatePresence({
      details: field[0],
      state: field[1],
      startTimestamp: elapsed,
      largeImageKey: image,
      largeImageText: 'Desktop customization tool'
    });

  };
  var onError = function (event) {
    if (typeof event.data != 'undefined') {
      console.log("Websocket Error:" + event.data);
    }
  };
  open();

})();
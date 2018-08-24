const WebSocket = require("WS");
const client = require('discord-rich-presence')('475313648500211739');
const fs = require('fs');
var reconnect;
var Updated = 0;

if (!fs.existsSync(process.env.APPDATA + "\\Rainmeter\\Plugins\\MessagePassing.dll") || !fs.existsSync(process.env.APPDATA + "\\Rainmeter\\Plugins\\messagepassing.dll")) {
  console.log("missing MessagePassing.dll (looked for "+process.env.APPDATA +"\\Rainmeter\\Plugins\\MessagePassing.dll OR "+process.env.APPDATA+"\\Rainmeter\\Plugins\\messagepassing.dll)");
}

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
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
field = [];
for(i = 0; i<=1; i++) {
  worker=res[i].replace(/([a-zA-Z])/g,'');
  if(res[i].includes("ALL")) {
    postfix="total ";
  }else if(res[i].includes("RM")) {
    postfix="RM ";
  }

  if(res[i].includes("RAMBOTH")) {
   part=worker.split("&");
   field[i]=humanFileSize(part[0], true) + ' (' + humanFileSize(part[1], true) + ' RM) RAM Usage';
 } else if(res[i].includes("CPUBOTH")) {
     part=worker.split("&");
     field[i]=Math.round(part[0] * 10) / 10 + '% ' + ' (' + Math.round(part[1] * 10) / 10 + '% ' + ' RM) CPU Usage';
  }
  else if(res[i].includes("CPU")) {
    field[i]=Math.round(worker * 10) / 10 + '% '+postfix+' CPU Usage';
  } else if(res[i].includes("RAM")) {
    field[i]=humanFileSize(worker, true) + ' '+postfix+ 'RAM Usage';
  } else if(res[i].includes("Loaded")) {
    field[i]=worker + ' skins loaded';
  }
}
if(Updated == 0) {
  if(res[2] == 1) {
    Updated=1;
    elapsed=(Date.now( )/ 1000 | 0);
  } else {
    elapsed=null;
  }
}
if(res[3] < 6) {
  image="rainmeter"+res[3];
} else {
  image="rainmeter1";
}
  client.updatePresence({
    details:  field[0],
    state: field[1],
    startTimestamp: elapsed,
    largeImageKey: image,
    largeImageText: 'Desktop customization tool'
  });

};
var onError = function(event) {
    if (typeof event.data != 'undefined') {
        console.log("Websocket Error:" + event.data);
    }
};
open();

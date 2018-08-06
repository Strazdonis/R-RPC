# R-RPC (Rainmeter Rich Presence)

R-RPC is a simple [Rainmeter](https://rainmeter.net) skin that sends rich-presence data to Discord (Rainmeter CPU & RAM usage *for now*).

# How it works

  - The "Node" part is a Node.js app that creates a websocket server (ws://127.0.0.1:58932/r-rpc)
  - The Rainmeter skin then connects to that websocket and sends CPU & RAM usage of the "Rainmeter.exe" process
  - I also package that into an .exe using [pkg](https://www.npmjs.com/package/pkg) so rainmeter can start that websocket server with a bang (Rainmeter/@Resources/r-rpc.exe.txt)
  - Using the bangs onRefreshAction & OnCloseAction I execute .vbs files so the .exe launches & gets killed hidden instead of spawning a console window.

### TODO
In the future I am willing to add this functionallity:

  - Functional settings for users (Rainmeter & Node wise)
  - more information to display (Loaded skins?)

### Usage

If you just want to use the skin then head to [Releases](https://github.com/Strazdonis/R-RPC/releases) and download the first result that you see, install the skin as you would any other. After loading the skin Discord will automatically update it's presence (might take up to 15s).

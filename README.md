# R-RPC (Rainmeter Rich Presence)

R-RPC is a simple [Rainmeter](https://rainmeter.net) skin that sends rich-presence data to Discord (Rainmeter/PC CPU/RAM usage or amount of loaded skins. *customizable in settings*).

# How it looks
![RPC](http://storuliukas.ml/usuck/Discord_2018-08-14_18-28-22.png)
![Settings](http://storuliukas.ml/usuck/Rainmeter_2018-08-14_18-28-49.png)

# How it works

  - The "Node" part is a Node.js app that creates a websocket server (ws://127.0.0.1:58932/r-rpc)
  - The Rainmeter skin then connects to that websocket and sends CPU & RAM usage of the "Rainmeter.exe" process and parses Rainmeter.ini for detecting how many skins have Active=1 on them.
  - I also package that into an .exe using [pkg](https://www.npmjs.com/package/pkg) so rainmeter can start that websocket server with a bang (Rainmeter/@Resources/r-rpc.exe)
  - Using the bangs onRefreshAction & OnCloseAction I execute .vbs files so the .exe launches & gets killed hidden instead of spawning a console window.

### Usage

If you just want to use the skin then head to [Releases](https://github.com/Strazdonis/R-RPC/releases) and download the first result that you see, install the skin as you would any other. After loading the skin Discord will automatically update it's presence (might take up to 15s).

### Customization

Next to the rpc.ini you will find a "settings" folder with settings.ini in it. Load the settings.ini skin to customize how R-RPC looks & behaves.

### TODO
In the future I am willing to add this functionallity:

  - more functionality (custom field values with user input?).

### Issues

If you notice that something is mis-behaving launch r-rpc.exe and check what the console window says.
Make sure you have the "Display currently running game as a status message." setting ON in discord.

If RPC shows that you have more skins loaded than you have - clean up your Rainmeter.ini file.

# BLE-PSX_Light-App
This is a web app which uses Web Bluetooth API to control a PSX-Light.

Usage
-----
If you have your hardware setup properly just open the [Web App](http://meisterbob.github.io/PSX_Light_control) and press the button to scan for the device and connect to it. Control the PSX-Light with the color wheel.

Development
-----------
If you want to modify the example clone the repository and type `npm install` in the root directory to install necessary node modules locally.
The App is based on Riot.js library and uses ES6 modules for code organization. Rollup is responsible for building the app.
`rollup -c -w` will build the app and start the file watcher to start the build on any file changes.

3rd party components
--------------------
Font Icons:
[Typicons](https://github.com/stephenhutchings/typicons.font) by Stephen Hutchings is licensed under [SIL OFL 1.1](http://scripts.sil.org/OFL_web)

Riot.js:
[License](https://github.com/riot/riot/blob/master/LICENSE.txt)

Tinycolor:
[License](https://github.com/bgrins/TinyColor/blob/master/LICENSE)

Inspired by the [Kuler Color Wheel](https://github.com/benknight/kuler-colorwheel-with-d3) reconstruction of Benjamin Knight

License
-------
MIT license, see [LICENSE](./LICENSE)

# BLE-Nixie-App
This is a sample web app which uses Web Bluetooth API to control a Diamex Nixie combined with a WT51822-S4AT module.

Prerequisites:
--------------
- Diamex Nixie with programmed Digi-Dot-Booster firmware
- WT51822-S4AT or any other nRF51822 based module programmed with [mbed BLE_DD-Booster](https://developer.mbed.org/users/Gamadril/code/BLE_DD-Booster/) firmware
- Mac or Linux system, Web Bluetooth support on Windows 10 is very poor
- Latest Chrome version with Web Bluetooth support

Usage
-----
If you have your hardware setup properly just open the [Web App](http://gamadril.github.io/BLE-Nixie) and press the button to scan for the device and connect to it. Control the Nixie with the color wheel on the first page and the digit selector on the second page.

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

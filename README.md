# OpenRCT2 plugin boilerplate
This boilerplate project (starting point to create OpenRCT2 plugins with) allows you to create a multi-file ES6 OpenRCT2 plugin and have it transpiled to a single ES5 file (Which OpenRCT2 supports).

## Installation
- Clone or download the project and put it somewhere on your computer.
- Run `npm install` to install all the required packages (Download [Node.js](https://nodejs.org/) if npm is not recognized).
- In the package.json and `src/index.js`, replace `MYPLUGINNAME` with the name of your plugin, and replace `OPENRCT2PATH` with the path to your OpenRCT2 directory.

## Build
You can build your project using the following commands:
- `npm run build` Manually build the project
- `npm run watch build` Automatically build everytime a source file is updated
If the installation was done correctly the transpiled JS file can be found in both the `build` directory and in the `plugin` directory of OpenRCT2. 
With hotreloading enabled and the watch command being used you no longer have to restart the game, and move files around manually.

## Development
You can create your project in the `src` directory. The `index.js` file is the root of your project, from there feel free to [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) other modules (files).

## Helper Suggestions
Check out OliUI if you plan on incorporating a custom window in your plugin. OliUI takes away the hassle that comes with having to position every single UI element manually and instead lets you focus on the functionality.
OliUI is an ES6 module that is compatible with this boilerplate. Simple copy [**the OliUI module file**](https://github.com/oli414/OliUI/blob/master/build/OliUI.js) into your project's `src/` folder and import the module.
```javascript
import Oui from "./OliUI";
```

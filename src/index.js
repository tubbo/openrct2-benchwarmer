// Expose the OpenRCT2 to Visual Studio Code's Intellisense
/// <reference path="OPENRCT2PATH/bin/openrct2.d.ts" />

// Import a module from another file.
import Message from "./module";

function main() {
    console.log(Message); // Display the imported "Hallo World" message from module.js.
}

registerPlugin({
    name: "MYPLUGINNAME",
    version: "0.1",
    licence: "MIT", // Make sure to set the license prior to release
    authors: [""],
    type: "local",
    main: main
});
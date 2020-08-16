// Expose the OpenRCT2 to Visual Studio Code's Intellisense
/// <reference path="OPENRCT2PATH/bin/openrct2.d.ts" />

import { version, author, license as licence } from "../package.json"
import Add from "./add"

const name = "Benchwarmer"

function main() {
  ui.registerMenuItem(name, () => { Add() })
}

registerPlugin({
    name,
    version,
    licence,
    authors: [author],
    type: "local",
    main: main
})

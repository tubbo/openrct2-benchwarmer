// Expose the OpenRCT2 to Visual Studio Code's Intellisense
/// <reference path="OPENRCT2PATH/bin/openrct2.d.ts" />

import { version, author, license as licence } from "../package.json"
import Add from "./add"

const name = "Benchwarmer"

function main() {
  ui.registerMenuItem(name, () => {
    const additions = context.getAllObjects("footpath_addition")
    const benches = additions.filter(addition => addition.identifier.includes("bench"))
    const bins = additions.filter(addition => addition.identifier.includes("litter"))

    let bench = benches.length > 0 ? benches[0].index : 0
    let bin = bins.length > 0 ? bins[0].index : 0

    const window = ui.openWindow({
      title: name,
      id: 1,
      classification: name,
      width: 300,
      height: 100,
      widgets: [
        {
          type: "label",
          x: 10,
          y: 20,
          width: 50,
          height: 10,
          text: "Bench:"
        },
        {
          type: "dropdown",
          x: 70,
          y: 20,
          width: 200,
          height: 10,
          items: benches.map(b => `${b.name} ${b.identifier}`),
          selectedIndex: 0,
          onChange: (number) => { bench = benches[number].index }
        },
        {
          type: "label",
          x: 10,
          y: 40,
          width: 50,
          height: 10,
          text: "Bin:"
        },
        {
          type: "dropdown",
          x: 70,
          y: 40,
          width: 200,
          height: 10,

          items: bins.map(b => `${b.name} ${b.identifier}`),
          selectedIndex: 0,
          onChange: (number) => { bin = bins[number].index }
        },
        {
          type: "button",
          text: "Add",
          x: 10,
          y: 70,
          width: 50,
          height: 20,
          onClick: () => {
            Add(bench, bin)
            window.close()
          }
        }
      ]
    })
  })
}

registerPlugin({
  name,
  version,
  licence,
  authors: [author],
  type: "local",
  main: main
})

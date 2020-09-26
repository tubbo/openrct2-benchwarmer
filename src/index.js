// Expose the OpenRCT2 to Visual Studio Code's Intellisense
/// <reference path="OPENRCT2PATH/bin/openrct2.d.ts" />

import { version, author, license as licence } from "../package.json"
import Add from "./add"
import Settings from "./settings"

const name = "Benchwarmer"

function main() {
  const config = new Settings(context.getAllObjects("footpath_addition"))

  ui.registerMenuItem(name, () => {
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
          text: "Butts:"
        },
        {
          type: "dropdown",
          x: 70,
          y: 20,
          width: 200,
          height: 10,
          items: config.benches.map(b => `${b.name} ${b.identifier}`),
          selectedIndex: config.benchIndex,
          onChange: (number) => { config.bench = number }
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
          items: config.bins.map(b => `${b.name} ${b.identifier}`),
          selectedIndex: config.binIndex,
          onChange: (number) => { config.bin = number }
        },
        {
          type: "checkbox",
          x: 10,
          y: 55,
          width: 200,
          height: 15,
          isChecked: config.buildBinsOnAllSlopedPaths,
          text: "Build bins on all sloped footpaths",
          onChange: (checked) => { config.buildBinsOnAllSlopedPaths = checked }
        },
        {
          type: "button",
          text: "Add",
          x: 10,
          y: 75,
          width: 50,
          height: 20,
          onClick: () => {
            if (config.configured) {
              try {
                Add(config)
              } catch(e) {
                ui.showError("Error Building Benches/Bins", e.message)
              }
            }
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

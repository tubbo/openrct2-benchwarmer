// Expose the OpenRCT2 to Visual Studio Code's Intellisense
/// <reference path="OPENRCT2PATH/bin/openrct2.d.ts" />

import { version, author, license as licence } from "../package.json"
import Add from "./add"
import Settings from "./settings"
import { Dropdown, Checkbox, Button, Document } from "./ui"

const name = "Benchwarmer"

function main() {
  ui.registerMenuItem(name, () => {
    const additions = context.getAllObjects("footpath_addition")
    const settings = new Settings(additions)

    const window = ui.openWindow({
      title: name,
      id: 1,
      classification: name,
      width: 300,
      height: 115,
      widgets: Document(
        ...Dropdown(
          "Bench:",
          settings.benches,
          settings.selections.bench,
          (number) => { settings.bench = number }
        ),
        ...Dropdown(
          "Bin:",
          settings.bins,
          settings.selections.bin,
          (number) => { settings.bin = number }
        ),
        Checkbox(
          "Build bins on all sloped footpaths",
          settings.buildBinsOnAllSlopedPaths,
          checked => { settings.buildBinsOnAllSlopedPaths = checked }
        ),
        Checkbox(
          "Preserve other additions (e.g. lamps)",
          settings.preserveOtherAdditions,
          checked => { settings.preserveOtherAdditions = checked }
        ),
        Button("Add", () => {
          if (settings.configured) {
            try {
              Add(settings)
            } catch(e) {
              ui.showError("Error Building Benches/Bins", e.message)
            }
          }
          window.close()
        })
      )
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

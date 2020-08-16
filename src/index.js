// Expose the OpenRCT2 to Visual Studio Code's Intellisense
/// <reference path="OPENRCT2PATH/bin/openrct2.d.ts" />

import { version, author, license as licence } from "../package.json"

function main() {
  ui.registerMenuItem("Add benches and trash cans to all paths", () => {
    const paths = []
    const bench = 0
    const bin = 4

    // Iterate every tile in the map
    for (let y = 0; y < map.size.y; y++) {
      for (let x = 0; x < map.size.x; x++) {
        const tile = map.getTile(x, y)

        // Iterate every element on the tile
        for (let i = 0; i < tile.numElements; i++) {
          const element = tile.getElement(i)

          // If the element is a footpath, add it to our array
          if (element.type === "footpath") {
              paths.push(element)
          }
        }
      }
    }

    paths.forEach((path, index) => {
      if (index % 2 === 0) {
        path.addition = bench
      } else {
        path.addition = bin
      }
    })
  })
}

registerPlugin({
    name: "Benchwarmer",
    version,
    licence,
    authors: [author],
    type: "local",
    main: main
})

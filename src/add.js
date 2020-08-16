export default function Add() {
  const paths = []
  const additions = context.getAllObjects("footpath_addition")
  const benches = additions.filter(addition => addition.name === "Bench")
  const bins = additions.filter(addition => addition.name === "Litter Bin")
  const bench = additions.indexOf(benches[0])
  const bin = additions.indexOf(bins[0])

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
      park.cash -= 5
    } else {
      path.addition = bin
      park.cash -= 3
    }
  })
}

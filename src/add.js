function buildOnTile(surface, path) {
  return surface &&
    surface.hasOwnership &&
    path &&
    !path.isQueue &&
    !path.slopeDirection
}

export default function Add(bench=null, bin=null) {
  const paths = []

  // Iterate every tile in the map
  for (let y = 0; y < map.size.y; y++) {
    for (let x = 0; x < map.size.x; x++) {
      const { elements } = map.getTile(x, y)
      const surface = elements.filter(element => element.type === "surface")[0]
      const path = elements.filter(element => element.type === "footpath")[0]

      if (buildOnTile(surface, path)) {
        paths.push(path)
      }
    }
  }

  if (bench !== null && bin !== null) {
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
}

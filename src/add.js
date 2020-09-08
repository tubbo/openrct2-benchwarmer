export default function Add(bench, bin, buildBinsOnAllSlopedPaths) {
  const paths = { unsloped: [], sloped: [] }

  // Iterate every tile in the map
  for (let y = 0; y < map.size.y; y++) {
    for (let x = 0; x < map.size.x; x++) {
      const { elements } = map.getTile(x, y)
      const surface = elements.filter(element => element.type === "surface")[0]
      const footpaths = elements.filter(element => element.type === "footpath")

      footpaths.forEach(path => {
        if ((surface?.hasOwnership || surface?.hasConstructionRights) && !path?.isQueue) {
          if (path?.slopeDirection === null) {
            paths.unsloped.push({ path, x, y })
          } else {
            paths.sloped.push({ path, x, y })
          }
        }
      })
    }
  }

  // Build benches and bins on unsloped paths
  paths.unsloped.forEach(({ path, x, y }) => {
    if (x % 2 === y % 2) {
      path.addition = bench
      park.cash -= 5
    } else {
      path.addition = bin
      park.cash -= 3
    }
  })

  // Build bins on sloped paths
  paths.sloped.forEach(({ path, x, y }) => {
    if (buildBinsOnAllSlopedPaths || (x % 2 === y % 2)) {
      path.addition = bin
      park.cash -= 3
    }
  })
}

export default function Add(bench, bin, buildBinsOnAllSlopedPaths) {
  const paths = { unsloped: [], sloped: [] }

  // Money in RCT2 is expressed in dimes, e.g. $3 is "30"
  const priceBin = 30
  const priceBench = 50

  // Iterate every tile in the map
  for (let y = 0; y < map.size.y; y++) {
    for (let x = 0; x < map.size.x; x++) {
      const { elements } = map.getTile(x, y)
      const surface = elements.filter(element => element.type === "surface")[0]
      const footpaths = elements.filter(element => element.type === "footpath")

      footpaths.forEach(path => {
        if (surface?.hasOwnership && !path?.isQueue) {
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
      ensureHasAddition(path, bench, priceBench)
    } else {
      ensureHasAddition(path, bin, priceBin)
    }
  })

  // Build bins on sloped paths
  paths.sloped.forEach(({ path, x, y }) => {
    if (buildBinsOnAllSlopedPaths || (x % 2 === y % 2)) {
      ensureHasAddition(path, bin, priceBin)
    }
  })
}

function ensureHasAddition(path, addition, price) {
  if (path.addition !== addition) {
    path.addition = addition
    park.cash -= price
  }
}

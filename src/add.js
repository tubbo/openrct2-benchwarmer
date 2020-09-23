export default function Add(bench, bin, buildBinsOnAllSlopedPaths, benches, bins) {
  const paths = { unsloped: [], sloped: [] }
  const isBenchOrBin = ({ path }) => (
    path.addition === null ||
    benches.include(path.addition) ||
    bins.include(path.addition)
  )

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
  paths.unsloped.filter(isBenchOrBin).forEach(({ path, x, y }) => {
    if (x % 2 === y % 2) {
      ensureHasAddition(path, bench, priceBench)
    } else {
      ensureHasAddition(path, bin, priceBin)
    }
  })

  // Build bins on sloped paths
  paths.sloped.filter(isBenchOrBin).forEach(({ path, x, y }) => {
    if (buildBinsOnAllSlopedPaths || (x % 2 === y % 2)) {
      ensureHasAddition(path, bin, priceBin)
    }
  })
}

function ensureHasAddition(path, addition, price) {
  if (path.addition !== addition || path.isAdditionBroken) {
    path.addition = addition
    path.isAdditionBroken = false
    park.cash -= price
  }
}

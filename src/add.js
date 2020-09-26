import "polyfill-array-includes"

// Money in RCT2 is expressed in dimes, e.g. $3 is "30"
const PRICE_BIN = 30
const PRICE_BENCH = 50

export default function Add(config) {
  const paths = { unsloped: [], sloped: [] }
  const isBenchOrBin = ({ path }) => (
    path.addition === null ||
    config.benches.includes(path.addition) ||
    config.bins.includes(path.addition)
  )

  // Iterate every tile in the map
  for (let y = 0; y < map.size.y; y++) {
    for (let x = 0; x < map.size.x; x++) {
      const { elements } = map.getTile(x, y)
      const surface = elements.filter(element => element.type === "surface")[0]
      const footpaths = elements.filter(element => element.type === "footpath")

      footpaths.forEach(path => {
        if (canBuildAdditionOnPath(surface, path)) {
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
    const [addition, price] = findAdditionAndPrice(config.bench, config.bin, x, y)
    const cash = park.cash - price

    if (cash >= 0) {
      ensureHasAddition(path, addition, price)
    } else {
      throw new Error("Insufficient funds.")
    }
  })

  // Build bins on sloped paths

  paths.sloped.filter(isBenchOrBin).forEach(({ path, x, y }) => {
    const cash = park.cash - PRICE_BIN

    if ((config.buildBinsOnAllSlopedPaths || (x % 2 === y % 2)) && cash >= 0) {
      ensureHasAddition(path, config.bin, PRICE_BIN)
    }
  })
}

function ensureHasAddition(path, addition, price) {
  if (path.addition !== addition || path.isAdditionBroken) {
    path.addition = addition
    path.isAdditionBroken = false
    path.isAdditionGhost = false
    park.cash -= price
  }
}

function findAdditionAndPrice(bench, bin, x, y) {
  if (x % 2 === y % 2) {
    return [bench, PRICE_BENCH]
  } else {
    return [bin, PRICE_BIN]
  }
}

function canBuildAdditionOnPath(surface, path) {
  if (!surface || !path) {
    return false
  }
  if (path.isQueue) {
    return false
  }
  if (surface.hasOwnership) {
    return true
  }
  // Only allowed to build underground or elevated on land with construction rights
  if (surface.hasConstructionRights && surface.baseHeight !== path.baseHeight) {
    return true
  }
  return false
}

// Money in RCT2 is expressed in dimes, e.g. $3 is "30"
const PRICE_BIN = 30
const PRICE_BENCH = 50

export default function Add(bench, bin, buildBinsOnAllSlopedPaths, benches, bins) {
  const paths = { unsloped: [], sloped: [] }
  const isBenchOrBin = ({ path }) => (
    path.addition === null ||
    benches.include(path.addition) ||
    bins.include(path.addition)
  )

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
    const [addition, price] = findAdditionAndPrice(bench, bin, x, y)
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

    if ((buildBinsOnAllSlopedPaths || (x % 2 === y % 2)) && cash >= 0) {
      ensureHasAddition(path, bin, PRICE_BIN)
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

function findAdditionAndPrice(bench, bin, x, y) {
  if (x % 2 === y % 2) {
    return [bench, PRICE_BENCH]
  } else {
    return [bin, PRICE_BIN]
  }
}

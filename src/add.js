import "polyfill-array-includes";

// Money in RCT2 is expressed in dimes, e.g. $3 is "30"
const PRICE_BIN = 30;
const PRICE_BENCH = 50;

export default function Add(settings) {
  const paths = { unsloped: [], sloped: [] };
  const benchIndexes = settings.benches.map((b) => b.index);
  const binIndexes = settings.bins.map((b) => b.index);
  const conflictsWithExistingAddition = (path) =>
    settings.preserveOtherAdditions &&
    path.addition !== null &&
    !benchIndexes.includes(path.addition) &&
    !binIndexes.includes(path.addition);
  const useMoney = !park.getFlag("noMoney");

  // Iterate every tile in the map
  for (let y = 0; y < map.size.y; y++) {
    for (let x = 0; x < map.size.x; x++) {
      const { elements } = map.getTile(x, y);
      const surface = elements.filter(
        (element) => element.type === "surface"
      )[0];
      const footpaths = elements.filter(
        (element) => element.type === "footpath"
      );

      footpaths.forEach((path) => {
        if (!canBuildAdditionOnPath(surface, path)) {
          return;
        }
        if (conflictsWithExistingAddition(path)) {
          return;
        }
        if (path?.slopeDirection === null) {
          paths.unsloped.push({ path, x, y });
        } else {
          paths.sloped.push({ path, x, y });
        }
      });
    }
  }

  // Build benches and bins on unsloped paths
  paths.unsloped.forEach(({ path, x, y }) => {
    const { bench, bin } = settings;
    const [addition, price] = findAdditionAndPrice(bench, bin, x, y);
    const cash = park.cash - price;

    if (useMoney && cash >= 0) {
      ensureHasAddition(path, addition, price);
    } else if (!useMoney) {
      ensureHasAddition(path, addition, 0);
    } else {
      throw new Error("Insufficient funds.");
    }
  });

  // Build bins on sloped paths
  paths.sloped.forEach(({ path, x, y }) => {
    const cash = park.cash - PRICE_BIN;
    const affordable = cash >= 0;
    const { buildBinsOnAllSlopedPaths } = settings;
    const evenTile = x % 2 === y % 2;
    const buildOnSlopedPath = buildBinsOnAllSlopedPaths || evenTile;

    if (useMoney && buildOnSlopedPath && affordable) {
      ensureHasAddition(path, settings.bin, PRICE_BIN);
    } else if (!useMoney && buildOnSlopedPath) {
      ensureHasAddition(path, settings.bin, 0);
    }
  });
}

function ensureHasAddition(path, addition, price) {
  if (path.addition !== addition || path.isAdditionBroken) {
    path.addition = addition;
    path.isAdditionBroken = false;
    path.isAdditionGhost = false;
    park.cash -= price;
  }
}

function findAdditionAndPrice(bench, bin, x, y) {
  if (x % 2 === y % 2) {
    return [bench, PRICE_BENCH];
  } else {
    return [bin, PRICE_BIN];
  }
}

function canBuildAdditionOnPath(surface, path) {
  if (!surface || !path) {
    return false;
  }

  if (path.isQueue) {
    return false;
  }

  if (surface.hasOwnership) {
    return true;
  }

  // Only allowed to build underground or elevated on land with construction rights
  if (surface.hasConstructionRights && surface.baseHeight !== path.baseHeight) {
    return true;
  }

  return false;
}

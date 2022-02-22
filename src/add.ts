import { Settings } from "./settings";

// Money in RCT2 is expressed in dimes, e.g. $3 is "30"
const PRICE_BIN = 30;
const PRICE_BENCH = 50;
const PRICE_QUEUETV = 150;

type Path = {
  path: FootpathElement;
  x: number;
  y: number;
};

type Paths = {
  unsloped: Path[];
  sloped: Path[];
};

type Queues = {
  queue: Path[];
};

export function Add(settings: Settings): Paths {
  const paths: Paths = { unsloped: [], sloped: [] };
  const queues: Queues = { queue: [] };
  const useMoney = !park.getFlag("noMoney");

  // Iterate every tile in the map
  for (let y = 0; y < map.size.y; y++) {
    for (let x = 0; x < map.size.x; x++) {
      const { elements } = map.getTile(x, y);
      const surface = elements.filter(
        (element) => element.type === "surface"
      )[0] as SurfaceElement;
      const footpaths = elements.filter(
        (element) => element.type === "footpath"
      ) as FootpathElement[];

      footpaths.forEach((path: FootpathElement) => {
        if (!canBuildAdditionOnPath(surface, path)) {
          if (!canBuildAdditionOnQueue(surface, path)) {
            return;
          } else {
            queues.queue.push({ path, x, y });
            return;
          }
        }
        if (conflictsWithExistingAddition(path, settings)) {
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
      ensureHasAddition(x, y, path.baseZ, addition);
    } else if (!useMoney) {
      ensureHasAddition(x, y, path.baseZ, addition);
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
      ensureHasAddition(x, y, path.baseZ, settings.bin);
    } else if (!useMoney && buildOnSlopedPath) {
      ensureHasAddition(x, y, path.baseZ, settings.bin);
    }
  });

  // Build queue tvs on queue lines
  queues.queue.forEach(({ path, x, y }) => {
    const { queuetv } = settings;
    const [addition, price] = [queuetv, PRICE_QUEUETV];
    const cash = park.cash - price;

    if (useMoney && cash >= 0) {
      ensureHasAddition(x, y, path.baseZ, addition);
    } else if (!useMoney) {
      ensureHasAddition(x, y, path.baseZ, addition);
    } else {
      throw new Error("Insufficient funds.");
    }
  });

  return paths;
}

function conflictsWithExistingAddition(
  path: FootpathElement,
  settings: Settings
): boolean {
  return path.addition !== null && settings.preserveOtherAdditions;
}

function ensureHasAddition(x: number, y: number, z: number, addition: number) {
  context.executeAction(
    "footpathadditionplace",
    {
      x: x * 32,
      y: y * 32,
      z,
      object: addition + 1,
    },
    ({ errorTitle, errorMessage }) => {
      if (errorMessage) throw new Error(`${errorTitle}: ${errorMessage}`);
    }
  );
}

function findAdditionAndPrice(
  bench: number,
  bin: number,
  x: number,
  y: number
) {
  if (x % 2 === y % 2) {
    return [bench, PRICE_BENCH];
  } else {
    return [bin, PRICE_BIN];
  }
}

function canBuildAdditionOnPath(
  surface: SurfaceElement,
  path: FootpathElement
) {
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

function canBuildAdditionOnQueue(
  surface: SurfaceElement,
  path: FootpathElement
) {
  if (!surface || !path) {
    return false;
  }

  if (!path.isQueue) {
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

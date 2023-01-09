import { Settings } from "./settings";

type Path = {
  path: FootpathElement;
  x: number;
  y: number;
};

type Paths = {
  unsloped: Path[];
  sloped: Path[];
  queues: Path[];
};

export function Add(settings: Settings): Paths {
  const paths: Paths = {
    unsloped: [],
    sloped: [],
    queues: [],
  };

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
        if (canBuildAdditionOnPath(surface, path)) {
          if (path.isQueue) {
            paths.queues.push({ path, x, y });
          } else if (path?.slopeDirection === null) {
            paths.unsloped.push({ path, x, y });
          } else {
            paths.sloped.push({ path, x, y });
          }
        }
      });
    }
  }

  // Build benches and bins on unsloped paths
  paths.unsloped.forEach(({ path, x, y }) => {
    const { bench, bin } = settings;
    const addition = findAddition(bench, bin, x, y);

    ensureHasAddition(x, y, path.baseZ, addition);
  });

  // Build bins on sloped paths
  paths.sloped.forEach(({ path, x, y }) => {
    const { buildBinsOnAllSlopedPaths } = settings;
    const evenTile = x % 2 === y % 2;
    const buildOnSlopedPath = buildBinsOnAllSlopedPaths || evenTile;

    if (buildOnSlopedPath) {
      ensureHasAddition(x, y, path.baseZ, settings.bin);
    }
  });

  // Build queue tvs on queue lines
  paths.queues.forEach(({ path, x, y }) => {
    const { buildQueueTVs } = settings;
    if (buildQueueTVs) {
      ensureHasAddition(x, y, path.baseZ, settings.queuetv);
    }
  });

  return paths;
}

/**
 * Build the footpath addition on a footpath.
 */
function ensureHasAddition(
  x: number,
  y: number,
  z: number,
  addition: number
): void {
  context.executeAction(
    "footpathadditionplace",
    {
      // x/y coords need to be multiples of 32
      x: x * 32,
      y: y * 32,
      z,
      // 0 means "no addition", so everything must be 1-indexed
      object: addition + 1,
    },
    ({ errorTitle, errorMessage }) => {
      if (errorMessage) throw new Error(`${errorTitle}: ${errorMessage}`);
    }
  );
}

export function findAddition(
  bench: number,
  bin: number,
  x: number,
  y: number
): number {
  if (x % 2 === y % 2) {
    return bench;
  } else {
    return bin;
  }
}

function canBuildAdditionOnPath(
  surface: SurfaceElement,
  path: FootpathElement
) {
  if (!surface || !path) return false;
  if (path.addition !== null) return false;
  if (surface.hasOwnership) return true;

  // Only allowed to build underground or elevated on land with construction rights
  if (surface.hasConstructionRights && surface.baseHeight !== path.baseHeight) {
    return true;
  }

  return false;
}

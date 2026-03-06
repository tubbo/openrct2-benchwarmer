import { Add, findAddition } from "./add";
import { author, license as licence, version } from "./package.json";
import { Settings } from "./settings";
import { Button, Checkbox, Document, Dropdown } from "./ui";

const name = "Benchwarmer";

function main() {
  const additions = context.getAllObjects("footpath_addition");
  const settings = new Settings(additions);

  ui.registerMenuItem(name, () => {
    const window = ui.openWindow({
      title: name,
      id: 1,
      classification: name,
      width: 300,
      height: 180,
      widgets: Document(
        // Benches Dropdown
        ...Dropdown(
          "Benches:",
          ["None", ...settings.benches.map(b => b.name)],
          settings.selections.bench === -1 ? 0 : settings.selections.bench + 1,
          (index: number) => {
            settings.bench = index === 0 ? -1 : index - 1;
          },
        ),
        // Bins Dropdown
        ...Dropdown(
          "Bins:",
          ["None", ...settings.bins.map(b => b.name)],
          settings.selections.bin === -1 ? 0 : settings.selections.bin + 1,
          (index: number) => {
            settings.bin = index === 0 ? -1 : index - 1;
          },
        ),
        // Queue TVs Dropdown
        ...Dropdown(
          "Queue TVs:",
          ["None", ...settings.queuetvs.map(q => q.name)],
          settings.selections.queuetv === -1 ? 0 : settings.selections.queuetv + 1,
          (index: number) => {
            settings.queuetv = index === 0 ? -1 : index - 1;
          },
        ),
        // Lamps Dropdown
        ...Dropdown(
          "Lamps:",
          ["None", ...settings.lamps.map(l => l.name)],
          settings.selections.lamp === -1 ? 0 : settings.selections.lamp + 1,
          (index: number) => {
            settings.lamp = index === 0 ? -1 : index - 1;
          },
        ),
        Checkbox(
          "Build bins on all sloped footpaths",
          settings.buildBinsOnAllSlopedPaths,
          (checked: boolean) => {
            settings.buildBinsOnAllSlopedPaths = checked;
          },
        ),
        Checkbox(
          "Preserve other additions (e.g. lamps)",
          settings.preserveOtherAdditions,
          (checked: boolean) => {
            settings.preserveOtherAdditions = checked;
          },
        ),
        Checkbox(
          "Add benches, bins, and lamps as paths are placed",
          settings.asYouGo,
          (checked: boolean) => {
            settings.asYouGo = checked;
          },
        ),
        Button("Build on All Paths", () => {
          if (settings.configured) {
            try {
              Add(settings);
            } catch (e) {
              ui.showError("Error Building Benches/Bins/Lamps", (e as Error).message);
            }
          }
          window.close();
        }),
      ),
    });
  });

  context.subscribe("action.execute", ({ action, args, isClientOnly }) => {
    if (action === "footpathplace" && settings.asYouGo && !isClientOnly) {
      if (!settings.configured) {
        return; // Skip if benches and bins aren't configured
      }
      const { x, y, z, slope, constructFlags } = args as FootpathPlaceArgs;
      let addition: number;
      if (constructFlags === 1) { // Queue path
        if (settings.queueTVConfigured && settings.queuetv !== undefined) {
          addition = settings.queuetv;
        } else {
          return; // Skip if queue TV isn't configured or available
        }
      } else if (slope) { // Sloped path
        if (settings.bin !== undefined) {
          addition = settings.bin;
        } else {
          return; // Skip if bin isn't available
        }
      } else { // Unsloped path
        if (settings.bench === undefined || settings.bin === undefined) {
          return; // Skip if required additions aren't configured
        }
        addition = findAddition(settings.bench, settings.bin, settings.lamp, x / 32, y / 32);
      }
      context.executeAction(
        "footpathadditionplace",
        { x, y, z, object: addition },
        ({ errorTitle, errorMessage }) => {
          if (errorMessage) throw new Error(`${errorTitle}: ${errorMessage}`);
        },
      );
    }
  });
}

registerPlugin({
  name,
  version,
  licence,
  authors: [author],
  type: "local",
  main,
  minApiVersion: 68,
  targetApiVersion: 77,
});
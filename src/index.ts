import { version, author, license as licence } from "../package.json";
import { Add, findAddition } from "./add";
import { Settings } from "./settings";
import { Dropdown, Checkbox, Button, Document } from "./ui";

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
      height: 160,
      widgets: Document(
        ...Dropdown(
          "Bench:",
          settings.benches,
          settings.selections.bench,
          (index: number) => {
            settings.bench = index;
          }
        ),
        ...Dropdown(
          "Bin:",
          settings.bins,
          settings.selections.bin,
          (index: number) => {
            settings.bin = index;
          }
        ),
        ...Dropdown(
          "Queue TV:",
          settings.queuetvs,
          settings.selections.queuetv,
          (index: number) => {
            settings.queuetv = index;
          }
        ),
        Checkbox(
          "Build Queue TVs",
          settings.buildQueueTVs,
          (checked: boolean) => {
            settings.buildQueueTVs = checked;
          }
        ),
        Checkbox(
          "Build bins on all sloped footpaths",
          settings.buildBinsOnAllSlopedPaths,
          (checked: boolean) => {
            settings.buildBinsOnAllSlopedPaths = checked;
          }
        ),
        Checkbox(
          "Preserve other additions (e.g. lamps)",
          settings.preserveOtherAdditions,
          (checked: boolean) => {
            settings.preserveOtherAdditions = checked;
          }
        ),
        Checkbox(
          "Add benches and bins as paths are placed",
          settings.asYouGo,
          (checked: boolean) => {
            settings.asYouGo = checked;
          }
        ),
        Button("Build on All Paths", () => {
          if (settings.configured) {
            try {
              Add(settings);
            } catch (e) {
              ui.showError("Error Building Benches/Bins", (e as Error).message);
            }
          }
          window.close();
        })
      ),
    });
  });
  context.subscribe("action.execute", ({ action, args, isClientOnly }) => {
    if (action === "footpathplace" && settings.asYouGo && !isClientOnly) {
      const { x, y, z, slope, constructFlags } = args as FootpathPlaceArgs;
      let addition = settings.bin;
      if (constructFlags === 1) {
        addition = settings.queuetv;
      } else {
        addition = slope
          ? settings.bin
          : findAddition(settings.bench, settings.bin, x / 32, y / 32);
      }
      if (
        (addition == settings.queuetv && settings.buildQueueTVs) ||
        addition != settings.queuetv
      ) {
        context.executeAction(
          "footpathadditionplace",
          { x, y, z, object: addition + 1 },
          ({ errorTitle, errorMessage }) => {
            if (errorMessage) throw new Error(`${errorTitle}: ${errorMessage}`);
          }
        );
      }
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
});

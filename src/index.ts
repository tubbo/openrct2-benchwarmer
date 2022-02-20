import { version, author, license as licence } from "../package.json";
import { Add } from "./add";
import { Settings } from "./settings";
import { Dropdown, Checkbox, Button, Document } from "./ui";

const name = "Benchwarmer";

function main() {
  ui.registerMenuItem(name, () => {
    const additions = context.getAllObjects("footpath_addition");
    const settings = new Settings(additions);

    const window = ui.openWindow({
      title: name,
      id: 1,
      classification: name,
      width: 300,
      height: 140,
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
        Button("Add", () => {
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
}

registerPlugin({
  name,
  version,
  licence,
  authors: [author],
  type: "local",
  main,
});

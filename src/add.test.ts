import { Add } from "./add";
//import { AddQueueTVs } from "./add";
import { Settings } from "./settings";
import { mocked } from "ts-jest/utils";

const sharedStorage = mocked(context.sharedStorage);

describe("add", () => {
  it("places benches and bins", () => {
    expect.hasAssertions();
    sharedStorage.get.mockReturnValue(0);

    const all: LoadedObject[] = [
      {
        index: 0,
        type: "footpath_addition",
        identifier: "bench",
        legacyIdentifier: "bench",
        name: "bench",
      },
      {
        index: 1,
        type: "footpath_addition",
        identifier: "litter",
        legacyIdentifier: "litter",
        name: "litter bin",
      },
    ];
    const [bench, bin] = all;
    const settings = new Settings(all);
    const { sloped, unsloped } = Add(settings);
    const paths = [...sloped, ...unsloped].map(({ path }) => path);

    expect(paths).not.toHaveLength(0);
    expect(paths[1].addition).toStrictEqual(bench.index);
    expect(paths[2].addition).toStrictEqual(bin.index);
  })
});

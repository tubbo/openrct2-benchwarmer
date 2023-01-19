import { Add } from "./add";
import { Settings } from "./settings";
import { mocked } from "ts-jest/utils";

const sharedStorage = mocked(context.sharedStorage);

describe("add", () => {
  it("places benches and bins", () => {
    expect.hasAssertions();
    // mocked shared storage will return default value
    sharedStorage.get.mockImplementation((_, defaultValue) => defaultValue);

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
    const { sloped, unsloped, queues } = Add(settings);
    const paths = [...sloped, ...unsloped, ...queues].map(({ path }) => path);

    expect(paths).not.toHaveLength(0);
    expect(paths[1].addition).toStrictEqual(bench.index);
    expect(paths[2].addition).toStrictEqual(bin.index);
  });
});

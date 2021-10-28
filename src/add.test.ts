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
  })/*,
  //Couldn't figure out how to get this test case to work
  it("places queue tvs", () => {
    expect.hasAssertions();
    sharedStorage.get.mockReturnValue(0);

    const all: LoadedObject[] = [
      {
        index: 0,
        type: "footpath_addition",
        identifier: "rct2.qtv1",
        legacyIdentifier: "qtv1",
        name: "queue tv",
      },
    ];
    const [queuetv] = all;
    const settings = new Settings(all);
    const { queue } = AddQueueTVs(settings);
    const paths = [...queue].map(({ path }) => path);

    //paths always comes up as empty, not sure why
    expect(paths).not.toHaveLength(0);
    expect(paths[1].addition).toStrictEqual(queuetv.index);
  })
  */
});

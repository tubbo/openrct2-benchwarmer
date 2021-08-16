import { Settings } from "./settings";
import { mocked } from "ts-jest/utils";

const sharedStorage = mocked(context.sharedStorage);

describe("Settings", () => {
  const additions: LoadedObject[] = [
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

  test("return bench and bin selections", () => {
    sharedStorage.get.mockReturnValue(0);

    const settings = new Settings(additions);

    expect(settings.bench).toEqual(0);
    expect(settings.bin).toEqual(1);
    expect(settings.configured).toBe(true);
  });

  test("select a bench", () => {
    sharedStorage.get.mockReturnValue(0);

    const settings = new Settings(additions);

    settings.bench = 0;
    settings.bin = 0;

    expect(settings.bench).toEqual(0);
    expect(settings.bin).toEqual(1);
  });

  test("preserve additions", () => {
    sharedStorage.get.mockReturnValue(false);

    const settings = new Settings(additions);

    settings.preserveOtherAdditions = false;

    expect(settings.preserveOtherAdditions).toBe(false);
  });

  test("build bins on all sloped paths", () => {
    sharedStorage.get.mockReturnValue(true);

    const settings = new Settings(additions);

    settings.buildBinsOnAllSlopedPaths = true;

    expect(settings.preserveOtherAdditions).toBe(true);
  });
});

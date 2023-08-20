import { Settings } from "./settings";
import { mocked } from "ts-jest/utils";

const sharedStorage = mocked(context.sharedStorage);

describe("settings", () => {
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
    {
      index: 2,
      type: "footpath_addition",
      identifier: "qtv",
      legacyIdentifier: "qtv",
      name: "queue tv",
    },
  ];

  it("returns bench and bin selections", () => {
    expect.hasAssertions();
    sharedStorage.get.mockReturnValue(0);

    const settings = new Settings(additions);

    expect(settings.bench).toStrictEqual(0);
    expect(settings.bin).toStrictEqual(1);
    expect(settings.queuetv).toStrictEqual(2);
    expect(settings.configured).toBe(true);
    expect(settings.queueTVConfigured).toBe(true);
  });

  it("selects a bench", () => {
    expect.hasAssertions();
    sharedStorage.get.mockReturnValue(0);

    const settings = new Settings(additions);

    settings.bench = 0;
    settings.bin = 0;
    settings.queuetv = 0;

    expect(settings.bench).toStrictEqual(0);
    expect(settings.bin).toStrictEqual(1);
    expect(settings.queuetv).toStrictEqual(2);
  });

  it("preserves additions", () => {
    expect.hasAssertions();
    sharedStorage.get.mockReturnValue(false);

    const settings = new Settings(additions);

    settings.preserveOtherAdditions = false;

    expect(settings.preserveOtherAdditions).toBe(false);
  });

  it("builds bins on all sloped paths", () => {
    expect.hasAssertions();
    sharedStorage.get.mockReturnValue(true);

    const settings = new Settings(additions);

    settings.buildBinsOnAllSlopedPaths = true;

    expect(settings.preserveOtherAdditions).toBe(true);
  });

  it("doesn't add queue tvs", () => {
    expect.hasAssertions();
    sharedStorage.get.mockReturnValue(false);

    const settings = new Settings(additions);

    settings.buildQueueTVs = false;

    expect(settings.buildQueueTVs).toBe(false);
  });
});

const BENCH = "Benchwarmer.Bench";
const BIN = "Benchwarmer.Bin";
const QUEUETV = "Benchwarmer.QueueTV";
const BUILD = "Benchwarmer.BuildOnAllSlopedFootpaths";
const PRESERVE = "Benchwarmer.PreserveOtherAdditions";
const AS_YOU_GO = "Benchwarmer.BuildAsYouGo";
const SPACING = "Benchwarmer.Spacing";

interface SpacingChoices {
  name: string;
  index: number;
}

interface Selections {
  bench: number;
  bin: number;
  queuetv: number;
  spacing: number;
}

export class Settings {
  benches: LoadedObject[];
  bins: LoadedObject[];
  queuetvs: LoadedObject[];
  spacings: SpacingChoices[];

  constructor(all: LoadedObject[]) {
    this.benches = all.filter((a) => a.identifier.includes("bench"));
    this.bins = all.filter((a) => a.identifier.includes("litter"));
    this.queuetvs = all.filter((a) => a.identifier.includes("qtv"));
    this.spacings = [
      {
        name: "No Gaps",
        index: 1,
      },

      {
        name: "Two Gaps",
        index: 3,
      },
      {
        name: "Four Gaps",
        index: 5,
      },
    ];
  }

  get bench(): number {
    return this.benches[this.selections.bench].index;
  }

  set bench(index: number) {
    context.sharedStorage.set(BENCH, index);
  }

  get bin(): number {
    return this.bins[this.selections.bin]?.index;
  }

  set bin(index: number) {
    context.sharedStorage.set(BIN, index);
  }

  get queuetv(): number {
    return this.queuetvs[this.selections.queuetv]?.index;
  }

  set queuetv(index: number) {
    context.sharedStorage.set(QUEUETV, index);
  }

  get spacing(): number {
    return this.spacings[this.selections.spacing]?.index;
  }

  set spacing(index: number) {
    context.sharedStorage.set(SPACING, index);
  }

  get selections(): Selections {
    const bench = context.sharedStorage.get(BENCH, 0);
    const bin = context.sharedStorage.get(BIN, 0);
    const queuetv = context.sharedStorage.get(QUEUETV, 0);
    const spacing = context.sharedStorage.get(SPACING, 0);

    return { bench, bin, queuetv, spacing };
  }

  get buildBinsOnAllSlopedPaths(): boolean {
    return context.sharedStorage.get(BUILD, false);
  }

  set buildBinsOnAllSlopedPaths(value: boolean) {
    context.sharedStorage.set(BUILD, value);
  }

  get preserveOtherAdditions(): boolean {
    return context.sharedStorage.get(PRESERVE, true);
  }

  set preserveOtherAdditions(value: boolean) {
    context.sharedStorage.set(PRESERVE, value);
  }

  get configured(): boolean {
    return this.bench !== null && this.bin !== null;
  }

  get queueTVConfigured(): boolean {
    return this.queuetv !== null;
  }

  get asYouGo(): boolean {
    return context.sharedStorage.get(AS_YOU_GO, false);
  }

  set asYouGo(value: boolean) {
    context.sharedStorage.set(AS_YOU_GO, value);
  }
}

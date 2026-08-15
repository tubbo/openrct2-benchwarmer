const BENCH = "Benchwarmer.Bench";
const BIN = "Benchwarmer.Bin";
const QUEUETV = "Benchwarmer.QueueTV";
const LAMP = "Benchwarmer.Lamp"; // Added constant for lamps
const BUILD = "Benchwarmer.BuildOnAllSlopedFootpaths";
const PRESERVE = "Benchwarmer.PreserveOtherAdditions";
const AS_YOU_GO = "Benchwarmer.BuildAsYouGo";

type Selections = {
  bench: number;
  bin: number;
  queuetv: number;
  lamp: number; // Added lamp to the selections type
};

export class Settings {
  benches: LoadedObject[];
  bins: LoadedObject[];
  queuetvs: LoadedObject[];
  lamps: LoadedObject[]; // Added lamps property

  constructor(all: LoadedObject[]) {
    this.benches = all.filter((a) => a.identifier.includes("bench"));
    this.bins = all.filter((a) => a.identifier.includes("litter"));
    this.queuetvs = all.filter((a) => a.identifier.includes("qtv"));
    this.lamps = all.filter((a) => a.identifier.includes("lamp")); // Initialize lamps
  }

  get bench(): number | undefined { // Updated to return number | undefined
    return this.benches[this.selections.bench]?.index;
  }

  set bench(index: number) {
    context.sharedStorage.set(BENCH, index);
  }

  get bin(): number | undefined { // Updated to return number | undefined
    return this.bins[this.selections.bin]?.index;
  }

  set bin(index: number) {
    context.sharedStorage.set(BIN, index);
  }

  get queuetv(): number | undefined { // Updated to return number | undefined
    return this.queuetvs[this.selections.queuetv]?.index;
  }

  set queuetv(index: number) {
    context.sharedStorage.set(QUEUETV, index);
  }

  get lamp(): number | undefined { // Added getter for lamp
    return this.lamps[this.selections.lamp]?.index;
  }

  set lamp(index: number) { // Added setter for lamp
    context.sharedStorage.set(LAMP, index);
  }

  get selections(): Selections {
    const bench = context.sharedStorage.get(BENCH, 0);
    const bin = context.sharedStorage.get(BIN, 0);
    const queuetv = context.sharedStorage.get(QUEUETV, 0);
    const lamp = context.sharedStorage.get(LAMP, 0); // Added lamp selection
    return { bench, bin, queuetv, lamp }; // Include lamp in the return object
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
    return this.bench !== undefined && this.bin !== undefined; // Updated to check undefined
  }

  get queueTVConfigured(): boolean {
    return this.queuetv !== undefined; // Updated to check undefined
  }

  get asYouGo(): boolean {
    return context.sharedStorage.get(AS_YOU_GO, false);
  }

  set asYouGo(value: boolean) {
    context.sharedStorage.set(AS_YOU_GO, value);
  }
}